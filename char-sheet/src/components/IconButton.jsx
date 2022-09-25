import React from 'react'

import {ImCross} from 'react-icons/im'


/* 
 * A button with an icon in it.
 * Just to standardise styling
 */
function IconButton({icon, isVisible=true, onClick}) {

  const iconClass = {
    "cross": ImCross
   }[icon]

  const opacity = isVisible ? "opacity-100" : 'opacity-0'
  return <button className={`btn btn-square btn-outline ${opacity}`}
            disabled={isVisible?"":"disabled"}>
    <iconClass
      size={10}
      
    ></iconClass>
  </button>
}

export default IconButton