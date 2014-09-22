module.exports = (targetElt, direction, options) ->
  throw new Error 'Invalid direction' if direction not in [ 'left', 'right', 'top', 'bottom' ]
  horizontal = direction in [ 'left', 'right' ]
  start = direction in [ 'left', 'top' ]

  options ?= {}
  options.collapsable ?= false

  handleElt = document.createElement 'div'
  handleElt.classList.add 'resize-handle'
  handleElt.classList.add direction
  handleElt.classList.add 'collapsable' if options.collapsable

  if start
    targetElt.parentNode.insertBefore handleElt, targetElt.nextSibling
  else
    targetElt.parentNode.insertBefore handleElt, targetElt

  savedSize = null

  handleElt.addEventListener 'dblclick', (event) ->
    return if event.button != 0 or ! handleElt.classList.contains('collapsable')

    size = targetElt.getBoundingClientRect()[ if horizontal then 'width' else 'height' ]

    if size > 0
      savedSize = size
      newSize = 0
      targetElt.style.display = 'none'
    else
      newSize = savedSize
      savedSize = null
      targetElt.style.display = ''

    if horizontal
      targetElt.style.width = "#{newSize}px"
    else
      targetElt.style.height = "#{newSize}px"

    return

  handleElt.addEventListener 'mousedown', (event) ->
    return if event.button != 0

    return if targetElt.style.display == 'none'

    if horizontal
      initialSize = targetElt.getBoundingClientRect().width
      startDrag = event.clientX
      directionClass = 'vertical'
    else
      initialSize = targetElt.getBoundingClientRect().height
      startDrag = event.clientY
      directionClass = 'horizontal'

    if handleElt.setCapture?
      dragTarget = this
      dragTarget.setCapture()
    else
      dragTarget = window
    document.documentElement.classList.add 'handle-dragging', directionClass

    onMouseMove = (event) ->
      size = initialSize + (if start then -startDrag else startDrag)

      if horizontal
        size += if start then event.clientX else -event.clientX
        targetElt.style.width = size + 'px'
      else
        size += if start then event.clientY else -event.clientY
        targetElt.style.height = size + 'px'

      return

    onMouseUp = (event) ->
      dragTarget.releaseCapture?()
      document.documentElement.classList.remove 'handle-dragging', directionClass

      dragTarget.removeEventListener 'mousemove', onMouseMove
      dragTarget.removeEventListener 'mouseup', onMouseUp
      return

    dragTarget.addEventListener 'mousemove', onMouseMove
    dragTarget.addEventListener 'mouseup', onMouseUp
    return

  return
