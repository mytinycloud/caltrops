import React from 'react'

import {ImCross, ImPencil, ImBin, ImDownload3, ImPlus, ImMinus, ImCheckmark, ImLock} from 'react-icons/im'


/* 
 * A button with an icon in it.
 * Just to standardise styling
 */
function IconButton({icon, onClick, btnStyle='btn-outline', size='xs', enabled=true, visible=true}) {

  const IconClass = {
    "cross": ImCross,
    "edit": ImPencil,
    "lock": ImLock, // ImLock is not centered.
    "download": ImDownload3,
    "delete": ImBin,
    "plus": ImPlus,
    "minus": ImMinus,
    "check": ImCheckmark,
  }[icon]

  const iconSize = {
    "xs": 8,
    "sm": 12,
    "md": 20,
    "lg": 32,
  }[size]

  let btnSize = `btn-${size}`
  let opacity = visible ? "opacity-100" : "opacity-0"

  return <button
      className={`btn ${btnSize} btn-square ${btnStyle} ${opacity} transition-all`}
      disabled={(visible && enabled) ? "" : "disabled"}
      onClick={onClick}
      >
    <IconClass size={iconSize}></IconClass>
  </button>
}

export default IconButton