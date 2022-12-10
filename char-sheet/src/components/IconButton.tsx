// Components
import {
  ImCross, ImPlus, ImMinus, ImHeart
} from 'react-icons/im'


/* 
 * A button with an icon in it.
 * Just to standardise styling
 */
function IconButton({icon, onClick, btnStyle='btn-outline', enabled=true, visible=true}: {
    icon: string,
    onClick(): void,
    btnStyle?: string,
    btnSize?: string,
    enabled?: boolean,
    visible?: boolean,
  }): JSX.Element {

  const IconClass: any = {
    "cross": ImCross,
    "heart": ImHeart,
    "plus": ImPlus,
    "minus": ImMinus,
  }[icon]

  let opacity = visible ? "opacity-100" : "opacity-0"

  return <button
      className={`btn btn-square btn-xs ${btnStyle} ${opacity} transition-all`}
      disabled={!(visible && enabled)}
      onClick={onClick}
      >
    <IconClass size={10}></IconClass>
  </button>
}

export default IconButton