import events = require("events");

class ResizeHandle extends events.EventEmitter {
  handleElt: HTMLDivElement;
  targetElt: HTMLElement;

  private direction: string;
  private horizontal: boolean;
  private start: boolean;
  private savedSize: number = null;

  constructor(targetElt: HTMLElement, direction: string, options?: { collapsable?: boolean; }) {
    super();

    if ([ "left", "right", "top", "bottom" ].indexOf(direction) === -1) throw new Error("Invalid direction");

    this.horizontal = [ "left", "right" ].indexOf(direction) !== -1;
    this.start = [ "left", "top" ].indexOf(direction) !== -1;

    if (options == null) options = {};

    this.targetElt = targetElt;
    this.direction = direction;

    let candidateElt = this.start ? targetElt.nextElementSibling : targetElt.previousElementSibling;
    if (candidateElt != null && candidateElt.tagName === "DIV" && candidateElt.classList.contains("resize-handle")) {
      this.handleElt = candidateElt as HTMLDivElement;
    } else {
      this.handleElt = document.createElement("div") as HTMLDivElement;
      this.handleElt.classList.add("resize-handle");

      if (this.start) targetElt.parentNode.insertBefore(this.handleElt, targetElt.nextSibling);
      else targetElt.parentNode.insertBefore(this.handleElt, targetElt);
    }

    this.handleElt.classList.add(direction);
    this.handleElt.classList.toggle("collapsable", options.collapsable);

    this.handleElt.addEventListener("dblclick", this.onDoubleClick);
    this.handleElt.addEventListener("mousedown", this.onMouseDown);
  }

  private onDoubleClick = (event: MouseEvent) => {
    if (event.button !== 0 || !this.handleElt.classList.contains("collapsable")) return;

    let size: number = (this.targetElt.getBoundingClientRect() as any)[ this.horizontal ? "width" : "height" ];
    let newSize: number;

    if (size > 0) {
      this.savedSize = size;
      newSize = 0;
      this.targetElt.style.display = "none";
    } else {
      newSize = this.savedSize;
      this.savedSize = null;
      this.targetElt.style.display = "";
    }

    if (this.horizontal) this.targetElt.style.width = `${newSize}px`;
    else this.targetElt.style.height = `${newSize}px`;
  };

  private onMouseDown = (event: MouseEvent) => {
    if (event.button !== 0) return;
    if (this.targetElt.style.display === "none") return;
    if (this.handleElt.classList.contains("disabled")) return;
    event.preventDefault();

    this.emit("dragStart");

    let initialSize: number;
    let startDrag: number;
    let directionClass: string;

    if (this.horizontal) {
      initialSize = this.targetElt.getBoundingClientRect().width;
      startDrag = event.clientX;
      directionClass = "vertical";
    } else {
      initialSize = this.targetElt.getBoundingClientRect().height;
      startDrag = event.clientY;
      directionClass = "horizontal";
    }

    let dragTarget: any;

    if ((this.handleElt as any).setCapture != null) {
      dragTarget = this.handleElt;
      dragTarget.setCapture();
    } else {
      dragTarget = window;
    }

    document.documentElement.classList.add("handle-dragging", directionClass);

    let onMouseMove = (event: MouseEvent) => {
      let size = initialSize + (this.start ? -startDrag : startDrag);
      this.emit("drag");

      if (this.horizontal) {
        size += this.start ? event.clientX : -event.clientX;
        this.targetElt.style.width = `${size}px`;
      } else {
        size += this.start ? event.clientY : -event.clientY;
        this.targetElt.style.height = `${size}px`;
      }
    };

    let onMouseUp = (event: MouseEvent) => {
      if (dragTarget.releaseCapture != null) dragTarget.releaseCapture();
      document.documentElement.classList.remove("handle-dragging", directionClass);

      dragTarget.removeEventListener("mousemove", onMouseMove);
      dragTarget.removeEventListener("mouseup", onMouseUp);

      this.emit("dragEnd");
    };

    dragTarget.addEventListener("mousemove", onMouseMove);
    dragTarget.addEventListener("mouseup", onMouseUp);
  };
}

export = ResizeHandle;
