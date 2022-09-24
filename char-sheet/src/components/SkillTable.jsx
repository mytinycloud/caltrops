import React, { useState } from 'react'
import { totalSkillCost } from '../lib/caltrops'
import { modifyObject } from '../lib/util'
import PointEntry from './PointEntry'

import { ImPencil, ImLock } from 'react-icons/im'

/* 
 * Skill table.
 * This consumes the rules.skills for skill metadata, and sheets.skills for skill values.
 */

function SkillTable({skills, scores, setScores, isEditable = false}) {
  let totalCost = totalSkillCost(scores)

  return (
    <div  className=''>
      <h2 className='text-2xl my-4'>Skills</h2>      
      <table className="table table-compact">
        <thead>
          <tr className='px-2'>
            <th>Skill</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {skills.map(s => {
            return(
              <tr className='hover' >
                <td>{s.name}</td>
                <td>
                  <PointEntry
                    value={scores[s.name] ?? 0}
                    setValue={(v) => {setScores(modifyObject(scores, s.name, v))}}
                    isEditable={isEditable}
                  />
                </td>
              </tr>
          )})}
        </tbody>
        <tfoot>
          <tr className='px-2'>
            <th>Skill cost</th>
            <th>{totalCost}</th>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default SkillTable