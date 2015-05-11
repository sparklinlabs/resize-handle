export = function(targetElt: HTMLElement, direction: string, options?: { collapsable?: boolean }) {
  if ([ "left", "right", "top", "bottom" ].indexOf(direction) === -1) throw new Error("Invalid direction" );

  let horizontal = [ "left", "right" ].indexOf(direction) !== -1;
  let start = [ "left", "top" ].indexOf(direction) !== -1;

  if (options == null) options = {};

  let handleElt = document.createElement("div");
  handleElt.classList.add("resize-handle");
  handleElt.classList.add(direction);
  if (options.collapsable) handleElt.classList.add("collapsable");

  if (start) targetElt.parentNode.insertBefore(handleElt, targetElt.nextSibling);
  else targetElt.parentNode.insertBefore(handleElt, targetElt);

  let savedSize: number = null;

  handleElt.addEventListener("dblclick", (event) => {
    if (event.button !== 0 || !handleElt.classList.contains("collapsable")) return;

    let size: number = (<any>targetElt.getBoundingClientRect())[ horizontal ? "width" : "height" ];
    let newSize: number;

    if (size > 0) {
      savedSize = size;
      newSize = 0;
      targetElt.style.display = "none";
    } else {
      newSize = savedSize;
      savedSize = null;
      targetElt.style.display = "";
    }

    if (horizontal) targetElt.style.width = `${newSize}px`;
    else targetElt.style.height = `${newSize}px`;
  });

  handleElt.addEventListener("mousedown", (event) => {
    if (event.button !== 0) return;
    if (targetElt.style.display === "none") return;

    let initialSize: number;
    let startDrag: number;
    let directionClass: string;

    if (horizontal) {
      initialSize = targetElt.getBoundingClientRect().width;
      startDrag = event.clientX;
      directionClass = "vertical";
    } else {
      initialSize = targetElt.getBoundingClientRect().height;
      startDrag = event.clientY;
      directionClass = "horizontal";
    }

    let dragTarget: any;

    if ((<any>handleElt).setCapture != null) {
      dragTarget = this;
      dragTarget.setCapture();
    } else {
      dragTarget = window;
    }

    document.documentElement.classList.add("handle-dragging", directionClass);

    let onMouseMove = (event: MouseEvent) => {
      let size = initialSize + (start ? -startDrag : startDrag);

      if (horizontal) {
        size += start ? event.clientX : -event.clientX;
        targetElt.style.width = `${size}px`;
      } else {
        size += start ? event.clientY : -event.clientY;
        targetElt.style.height = `${size}px`;
      }
    };

    let onMouseUp = (event: MouseEvent) => {
      if (dragTarget.releaseCapture != null) dragTarget.releaseCapture();
      document.documentElement.classList.remove("handle-dragging", directionClass);

      dragTarget.removeEventListener("mousemove", onMouseMove);
      dragTarget.removeEventListener("mouseup", onMouseUp);
    };

    dragTarget.addEventListener("mousemove", onMouseMove);
    dragTarget.addEventListener("mouseup", onMouseUp);
  });
}
