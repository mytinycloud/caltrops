/* 
 * Text entry box
 * This displays and allows editing of a string
 */
function TextEntryBox({value, setValue, editable=true, placeholder='', limit=32, inputSize='input-sm'}: {
    value: string,
    setValue(value: string): void,
    editable?: boolean,
    placeholder?: string,
    limit?: number,
    inputSize?: string
  }): JSX.Element {
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
      disabled={!editable}
      />
  )
}

export default TextEntryBox