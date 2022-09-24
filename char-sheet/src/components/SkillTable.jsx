import React, { useState } from 'react'
import { modifyObject } from '../lib/util'
import PointEntryBox from './PointEntryBox'
import caltrops from '../lib/caltrops'

/* 
 * Skill table.
 * This consumes the rules.skills for skill metadata, and sheets.skills for skill values.
 */

function SkillTable({skills, scores, setScores, level, isEditable = false}) {
  let totalCost = caltrops.totalSkillCost(scores)
  let maxCost = caltrops.maxSkillCost(level)

  return (
    <div className='px-8'>
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
                <td className='py-4'>{s.name}</td>
                <td className='text-center'>
                  <PointEntryBox
                    value={scores[s.name] ?? 0}
                    setValue={(v) => {setScores(modifyObject(scores, s.name, v))}}
                    isEditable={isEditable}
                  />
                </td>
              </tr>
          )})}
        </tbody>
        <tfoot>
          <tr className='px-2 text-center'>
            <th>Skill cost</th>
            <th>{totalCost} / {maxCost}</th>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default SkillTable