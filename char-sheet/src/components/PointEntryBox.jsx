import IconButton from './IconButton'

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
function PointEntryBox({value, setValue, isEditable=true, min=0, max=9, isCapped=false, visible=true, encourageUp=false}) {
  return (
    <div className="flex justify-center items-center">
      <IconButton
        icon='minus'
        onClick={()=>setValue(value-1)}
        enabled={value > min}
        visible={visible && isEditable}
      />
      <p className='py-0 mx-2 text-center width-3'> { visible ? value : ""} </p>
      <IconButton
        icon='plus'
        btnStyle={encourageUp ? 'btn-primary' : 'btn-outline'}
        onClick={()=>setValue(value+1)}
        enabled={!isCapped && value < max}
        visible={visible && isEditable}
      />
    </div>
  )
}

export default PointEntryBox