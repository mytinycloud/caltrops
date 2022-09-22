import React, {useState} from 'react'
import { skillCost, totalSkillCost } from '../lib/caltrops'

/* 
 * Skill table.
 * This consumes the rules.skills for skill metadata, and sheets.skills for skill values.
 */

function SkillTable({skills, scores, setScores}) {
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
                <td>{scores[s.name] ?? 0}</td>
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