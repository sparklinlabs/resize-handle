# perfect-resize

Robust, no-frill, stylable resize handles for HTML5 apps

## How to install

```
npm install perfect-resize
```

## Usage

See ``doc/demo.html``. 

 * Setup a ``display: flex; box-sizing: border-box;`` container with two ``div`` children.
 * Make the main pane ``flex: 1;`` and give it a ``min-width``.
 * Set the sidebar's ``width`` and ``min-width`` (or ``height``, if vertical).
 * Include ``lib/perfectResize.js`` in your project.
 * Create the handle by calling ``perfectResize( document.getElementById('#sidebar'), 'right' )``

You can pass ``{ collapsable: true }`` as a third argument to enable double-click-to-collapse.

## Browser support

  * Looks and feels perfect on Firefox 32, Chrome 37
  * Works in Internet Explorer 11 but cursor flickers