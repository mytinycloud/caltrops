import React, { useState } from 'react'
import { totalSkillCost } from '../lib/caltrops'
import { modifyObject } from '../lib/util'
import PointEntry from './PointEntry'
import TextEntry from './TextEntry'

/* 
 * Info table.
 * This consumes sheets.info for skill values.
 */

function InfoTable({info, setInfo, isEditable=false}) {

  return (
    <div  className=''>
      <h2 className='text-2xl my-4'>Info</h2>
      <table className="table table-compact">
        <thead>
        <tr className='hover' >
            <th>Info</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
          <tr className='hover' >
            <td>Name</td>
            <td>
            <TextEntry
              value={info.name}
              setValue={v => { setInfo(modifyObject(info, 'name', v)) }}
              isEditable={isEditable}
              />
            </td>
          </tr>
          <tr className='hover' >
            <td>Level</td>
            <td><PointEntry
              value={info.level}
              setValue={v => { setInfo(modifyObject(info, 'level', v)) }}
              isEditable={isEditable}
            /></td>
          </tr>
          <tr className='hover'>
            <td>Background</td>
            <td><TextEntry
              value={info.background}
              setValue={v => { setInfo(modifyObject(info, 'background', v)) }}
              isEditable={isEditable}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default InfoTable