
/* 
 * Text entry box
 * This displays and allows editing of a string
 */
function TextEntryBox({value, setValue, isEditable=true, placeholder='', limit=32, inputSize='input-sm'}) {
  return (
    <input
      type="text"
      className={`input w-full max-w-xs input-bordered ${inputSize}`}
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