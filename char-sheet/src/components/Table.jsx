import React from 'react'
import {ImCross} from 'react-icons/im'

/* 
  Base table component for experimentation. 
  Should be able to make it dynamic to support all tables listed (barring)

*/

function Table({title, data}) {

  const handleAdd = () => {
    console.log('adding')
  }

  return (
    <div>
      <h2 className='text-2xl my-4'>{title}</h2>
      <table className="table table-compact">
        <thead>
          <tr className='px-2'>
            <th></th>
            {data.heading.map((item, index) => {
              return <th>{item}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {data.content.map((items, index) => {
            return(
              <tr className='hover'>
                <td>{index+1}</td>
                {items.map((item, idx2) => {
                  return (
                    <td>{item}</td>
                  )
                })}
                <td className='tooltip cursor-pointer border-none' data-tip="Remove">
                  <ImCross 
                    size={20}
                    // This comes from the theme label 'error' in tailwind.config.js. 
                    // Instead of now specifying class colours (e.g. text-red-400), we can use the labels from the theme
                    // for consistent styling.
                    // Details on all available variations https://daisyui.com/docs/colors/ under 'List of all daisyUI color names'
                    className='text-error' 
                      >
                  </ImCross>
                </td>
              </tr>
          )})}          
        </tbody>
      </table>
      <div className='w-full flex my-4'>
        <button className='text-center text-lg mx-auto px-8 btn' onClick={handleAdd}>Add</button>
      </div>
    </div>
  )
}

export default Table