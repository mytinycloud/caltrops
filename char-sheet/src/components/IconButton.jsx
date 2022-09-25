import React from 'react'

import {ImCross, ImPencil, ImBin, ImDownload3, ImPlus, ImMinus, ImCheckmark, ImLock} from 'react-icons/im'


/* 
 * A button with an icon in it.
 * Just to standardise styling
 */
function IconButton({icon, onClick, styling='outline', size='xs', enabled=true, visible=true}) {

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

  return <button
      className={`btn btn-square btn-${styling} btn-${size} opacity-${visible ? "100" : "0"} transition-all`}
      disabled={(visible && enabled) ? "" : "disabled"}
      onClick={onClick}
      >
    <IconClass size={iconSize}></IconClass>
  </button>
}

export default IconButton