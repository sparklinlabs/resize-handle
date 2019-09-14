# resize-handle

Robust, no-frills, stylable resize handles / splitters for HTML5 apps.

## How to install

    npm install resize-handle

## Usage

Check out the [live demo](http://sparklinlabs.github.io/resize-handle/) and its [source code](https://github.com/sparklinlabs/resize-handle/blob/master/lib/index.html).

You'll need to setup a `display: flex; box-sizing: border-box;` container with two `div` children.
Make the main pane `flex: 1; flex-basis: 0;` and give it a `min-width`. Make sure to set the sidebar's `width` and `min-width` (or `height`, if vertical).

Include `lib/ResizeHandle.js` in your project and create the handle by calling `new ResizeHandle(document.querySelector("#sidebar"), "right")`.
You can pass `{ collapsable: true }` as a third argument to enable double-click-to-collapse.

The object returned by the ResizeHandle constructor emits `dragStart`, `drag` and `dragEnd` events.

See [index.d.ts](https://github.com/sparklinlabs/resize-handle/blob/master/index.d.ts) for the full API.

## Building from source

 * Make sure you have a recent version of [Node.js](http://nodejs.org/) installed.
 * Clone the repository from `https://github.com/sparklinlabs/resize-handle` and run `npm install` once
 * Run `npm run build` to build once or `npm run watch` to start a watcher that will rebuild when changes are detecting
