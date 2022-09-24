import React, { useState } from 'react'
import { totalSkillCost } from '../lib/caltrops'
import { modifyObject } from '../lib/util'
import PointEntryBox from './PointEntryBox'
import TextEntryBox from './TextEntryBox'

/* 
 * Info table.
 * This consumes sheets.info for skill values.
 */

function InfoTable({info, setInfo, isEditable=false}) {

  return (
    <div className='px-8'>
      <h2 className='text-2xl my-4'>Info</h2>
      <table className="table table-compact">
        <thead>
        <tr>
            <th>Info</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
          <tr className='hover' >
            <td>Name</td>
            <td>
            <TextEntryBox
              value={info.name}
              setValue={v => { setInfo(modifyObject(info, 'name', v)) }}
              isEditable={isEditable}
              />
            </td>
          </tr>
          <tr className='hover' >
            <td>Level</td>
            <td><PointEntryBox
              value={info.level}
              setValue={v => { setInfo(modifyObject(info, 'level', v)) }}
              isEditable={isEditable}
            /></td>
          </tr>
          <tr className='hover'>
            <td>Background</td>
            <td><TextEntryBox
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