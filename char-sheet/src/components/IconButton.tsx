// Components
import {
  ImCross, ImPencil, ImBin, ImDownload3,
  ImPlus, ImMinus, ImCheckmark, ImLock,
  ImFloppyDisk, ImFileEmpty, ImDice, ImUnlocked,
  ImMenu
} from 'react-icons/im'


/* 
 * A button with an icon in it.
 * Just to standardise styling
 */
function IconButton({icon, onClick, btnStyle='btn-outline', btnSize='btn-xs', enabled=true, visible=true}: {
    icon: string,
    onClick(): void,
    btnStyle?: string,
    btnSize?: string,
    enabled?: boolean,
    visible?: boolean,
  }): JSX.Element {

  const IconClass: any = {
    "cross": ImCross,
    "edit": ImPencil,
    "lock": ImLock, // ImLock is not centered.
    "unlock": ImUnlocked,
    "download": ImDownload3,
    "delete": ImBin,
    "plus": ImPlus,
    "minus": ImMinus,
    "check": ImCheckmark,
    "save": ImFloppyDisk,
    "dice": ImDice,
    "file": ImFileEmpty,
    "menu": ImMenu,
  }[icon]

  const iconSize = {
    "btn-xs": 10,
    "btn-sm": 14,
    "btn-md": 22,
    "btn-lg": 34,
  }[btnSize]

  let opacity = visible ? "opacity-100" : "opacity-0"

  return <button
      className={`btn btn-square ${btnStyle} ${btnSize} ${opacity} transition-all`}
      disabled={!(visible && enabled)}
      onClick={onClick}
      >
    <IconClass size={iconSize}></IconClass>
  </button>
}

export default IconButton