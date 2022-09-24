import React from 'react'

/* 
 * Point entry box
 * This displays and allows editing of a single value
 */
/* TODO: Are points lockable? E.g. once a value has been set, 
    it can currently be both incremented and decremented. Is this what you want? */
function PointEntryBox({value, setValue, isEditable=false, min=0, max=9}) {

  const isInvisible = isEditable ? "opacity-100" : 'opacity-0'

  return (
    <div className="flex justify-evenly items-center">
      <button
        className={`btn btn-accent btn-square btn-xs ${isInvisible} transition-all`}
        disabled={(isEditable && value > min) ? "" : "disabled"}
        onClick={()=>setValue(value-1)}>
        <p>-</p>
      </button>
      <p className='py-0 mx-2 text-center'> {value} </p>
      <button
        className={`btn btn-accent btn-square btn-xs ${isInvisible} transition-all`}
        disabled={(isEditable && value < max) ? "" : "disabled"}
        onClick={()=>setValue(value+1)}>
        <p>+</p>
      </button>
    </div>
  )
}

export default PointEntryBox