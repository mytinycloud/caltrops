import React from 'react'


/* 
 * Text entry box
 * This displays and allows editing of a string
 */
function TextEntryBox({value, setValue, isEditable=true, placeholder='', limit=32}) {
  return (
    <input
      type="text"
      className="input input-sm w-full max-w-xs"
      placeholder={placeholder}
      value={value}
      onChange={e => {
        let v = e.target.value
        if (v.length > limit) {
          v = v.substring(0, limit)
        }
        setValue(v)
      }}
      disabled={!isEditable}
      />
  )
}

export default TextEntryBox