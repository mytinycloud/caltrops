import React, {useState} from 'react'
import { totalSkillCost } from '../lib/caltrops'
import { modifyObject } from '../lib/util'
import PointEntryBox from './PointEntryBox'

import {ImPencil, ImLock} from 'react-icons/im'

/* 
 * Skill table.
 * This consumes the rules.skills for skill metadata, and sheets.skills for skill values.
 */

function SkillTable({skills, scores, setScores}) {
  let totalCost = totalSkillCost(scores)
  const [isEditing, setisEditing] = useState(false)

  return (
    <div  className=''>
      <h2 className='text-2xl my-4'>Skills</h2>

      <button className='btn btn-ghost btn-square btn-md' onClick={() => setisEditing(!isEditing)}>
      { isEditing
        ? <ImLock size={20} ></ImLock>
        : <ImPencil size={20} ></ImPencil>
      }
      </button>
      
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
                  <PointEntryBox
                    value={scores[s.name] ?? 0}
                    setValue={(v) => {setScores(modifyObject(scores, s.name, v))}}
                    isEditable={isEditing}
                  ></PointEntryBox>
                </td>
              </tr>
          )})}
        </tbody>
        <thead>
          <tr className='px-2'>
            <th>Skill cost</th>
            <th>{totalCost}</th>
          </tr>
        </thead>
      </table>
    </div>
  )
}

export default SkillTable