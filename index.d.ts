declare class ResizeHandle {
  handleElt: HTMLDivElement;
  targetElt: HTMLElement;

  constructor(targetElt: HTMLElement, direction: "left" | "right" | "top" | "bottom", options?: { collapsable?: boolean; });

  addListener(event: string, listener: Function): ResizeHandle;
  on(event: string, listener: Function): ResizeHandle;
  once(event: string, listener: Function): ResizeHandle;
  removeListener(event: string, listener: Function): ResizeHandle;
  removeAllListeners(event?: string): ResizeHandle;
  setMaxListeners(n: number): ResizeHandle;
  getMaxListeners(): number;
  listeners(event: string): Function[];
  emit(event: string, ...args: any[]): boolean;
  listenerCount(type: string): number;

  on(event: "dragStart", listener: Function): ResizeHandle;
  on(event: "drag", listener: Function): ResizeHandle;
  on(event: "dragEnd", listener: Function): ResizeHandle;
}

declare namespace ResizeHandle {}

export = ResizeHandle;
