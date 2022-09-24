import React from 'react'



/* 
 * Point entry box
 * This displays and allows editing of a single value
 */
function PointEntry({value, setValue, isEditable=false, min=0, max=9}) {
  if (isEditable)
  {
    return (
      <table>
        <tr>
          <td>
            <button
              className='btn btn-accent btn-square btn-xs'
              disabled={value > min ? "" : "disabled"}
              onClick={()=>setValue(value-1)}>
              <b>-</b>
            </button>
          </td>
          <td>
            {value}
          </td>
          <td>
            <button
              className='btn btn-accent btn-square btn-xs'
              disabled={value < max ? "" : "disabled"}
              onClick={()=>setValue(value+1)}>
              <b>+</b>
            </button>
          </td>
        </tr>
      </table>
    )
  }
  else
  {
    return value;
  }
}

export default PointEntry