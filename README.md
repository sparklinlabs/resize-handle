# perfect-resize

Robust, no-frills, stylable resize handles for HTML5 apps

## How to install

`npm install perfect-resize`

## Usage

See `doc/demo.html` for an example.

You'll need to setup a `display: flex; box-sizing: border-box;` container with two `div` children.
Make the main pane `flex: 1;` and give it a `min-width`. Make sure to set the sidebar's `width` and `min-width` (or `height`, if vertical).

Include `lib/PerfectResize.js` in your project and create the handle by calling `new PerfectResize( document.getElementById("#sidebar"), "right" )`.
You can pass `{ collapsable: true }` as a third argument to enable double-click-to-collapse.

The object returned by the PerfectResize constructor emits `dragStart`, `drag` and `dragEnd` events.

## Browser support

  * Looks and feels perfect on Firefox and Chrome
  * Works in Internet Explorer 11 but cursor flickers
