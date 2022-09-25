import React from 'react'

/* 
 * Point entry box
 * This displays and allows editing of a single value
 */
/* TODO: Are points lockable? E.g. once a value has been set, 
 *  it can currently be both incremented and decremented. Is this what you want?
 * 
 * Ideally the points would not be decremented once locked - but i'll leave it to the outer state to update the min value if that happens.
 * Its kindof a pain to actually lock things like this anyway, as users always make mistakes.  
 */
function PointEntryBox({value, setValue, isEditable=false, min=0, max=9, isCapped=false}) {

  const isInvisible = isEditable ? "opacity-100" : 'opacity-0'
  const canDecrement = isEditable && value > min
  const canIncrement = isEditable && !isCapped && value < max

  return (
    <div className="flex justify-evenly items-center">
      <button
        className={`btn btn-outline btn-square btn-xs ${isInvisible} transition-all`}
        disabled={canDecrement ? "" : "disabled"}
        onClick={()=>setValue(value-1)}>
        <p>-</p>
      </button>
      <p className='py-0 mx-2 text-center'> {value} </p>
      <button
        className={`btn btn-primary btn-square btn-xs ${isInvisible} transition-all`}
        disabled={canIncrement ? "" : "disabled"}
        onClick={()=>setValue(value+1)}>
        <p>+</p>
      </button>
    </div>
  )
}

export default PointEntryBox