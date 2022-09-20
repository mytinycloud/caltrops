import React, {useState} from 'react'
import {ImCross} from 'react-icons/im'

/* 
  Base table component for experimentation. 
  Should be able to make it dynamic to support all tables listed (barring)

*/

function Table({title, data}) {

  return (
    <div className=''>
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
              <tr className=''>
                <td>{index+1}</td>
              {items.map((item, idx2) => {
                return (
                  <td>{item}</td>
                )
              })}
              <td className='tooltip cursor-pointer border-none' data-tip="Remove" 
              >
                  <ImCross 
                    size={15} 
                    color='#F00' 
                     >
                  </ImCross>
                </td>
              </tr>
          )})}          
        </tbody>
      </table>
    </div>
  )
}

export default Table