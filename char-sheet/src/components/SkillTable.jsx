import React, { useState } from 'react'
import { modifyObject } from '../lib/util'
import PointEntryBox from './PointEntryBox'
import caltrops from '../lib/caltrops'

/* 
 * Skill table.
 *    in: skills <- rules.skills
 *    in: scores <- sheet.skills
 *    out: setScores -> sheet.skills
 *    in: level <- sheet.level
 */

function SkillTable({skills, scores, setScores, level, isEditable = false}) {
  let totalCost = caltrops.skillCostTotal(scores)
  let maxCost = caltrops.skillCostMax(level)
  let sparePoints = maxCost - totalCost;

  return (
    <div>
      <table className="table table-compact">
        <thead>
          <tr className='px-2'>
            <th>Skills</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {skills.map(s => {
            let value = scores[s.name] ?? 0
            return(
              <tr className='hover' >
                <td>{s.name}</td>
                <td className='text-center'>
                  <PointEntryBox
                    value={value}
                    setValue={(v) => {setScores(modifyObject(scores, s.name, v))}}
                    isEditable={isEditable}
                    isCapped={caltrops.skillIncrementCost(value) > sparePoints}
                    encourageUp='true'
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