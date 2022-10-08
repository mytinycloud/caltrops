// Components
import IconButton from './IconButton'

/* 
 * Point entry box
 * This displays and allows editing of a single value
 */
function PointEntryBox({value, setValue, editable=true, min=0, max=9, isCapped=false, visible=true, encourageUp=false}: {
    value: number,
    setValue(value: number): void,
    editable?: boolean,
    min?: number,
    max?: number,
    isCapped?: boolean,
    visible?: boolean,
    encourageUp?: boolean
  }): JSX.Element {
  return (
    <div className="flex justify-center items-center">
      <IconButton
        icon='minus'
        onClick={()=>setValue(value-1)}
        enabled={value > min}
        visible={visible && editable}
      />
      <p className='py-0 mx-2 text-center width-3'> { visible ? value : ""} </p>
      <IconButton
        icon='plus'
        btnStyle={encourageUp ? 'btn-primary' : 'btn-outline'}
        onClick={()=>setValue(value+1)}
        enabled={!isCapped && value < max}
        visible={visible && editable}
      />
    </div>
  )
}

export default PointEntryBox