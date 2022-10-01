import React from 'react'

import {ImCross, ImPencil, ImBin, ImDownload3, ImPlus, ImMinus, ImCheckmark, ImLock, ImFloppyDisk, ImFileEmpty, ImDice} from 'react-icons/im'


/* 
 * A button with an icon in it.
 * Just to standardise styling
 */
function IconButton({icon, onClick, btnStyle='btn-outline', btnSize='btn-xs', enabled=true, visible=true}) {

  const IconClass = {
    "cross": ImCross,
    "edit": ImPencil,
    "lock": ImLock, // ImLock is not centered.
    "download": ImDownload3,
    "delete": ImBin,
    "plus": ImPlus,
    "minus": ImMinus,
    "check": ImCheckmark,
    "save": ImFloppyDisk,
    "dice": ImDice,
    "file": ImFileEmpty
  }[icon]

  const iconSize = {
    "btn-xs": 8,
    "btn-sm": 12,
    "btn-md": 20,
    "btn-lg": 32,
  }[btnSize]

  let opacity = visible ? "opacity-100" : "opacity-0"

  return <button
      className={`btn btn-square ${btnStyle} ${btnSize} ${opacity} transition-all`}
      disabled={(visible && enabled) ? "" : "disabled"}
      onClick={onClick}
      >
    <IconClass size={iconSize}></IconClass>
  </button>
}

export default IconButton