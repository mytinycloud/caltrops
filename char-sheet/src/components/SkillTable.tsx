// External imports
import { useState } from 'react'

// Components
import PointEntryBox from './PointEntryBox'

// Internal imports
import { modifyObject } from '../lib/util'
import caltrops from '../lib/caltrops'
import { Skill, Dictionary, RollInfo, Attribute } from '../lib/rules'
import IconButton from './IconButton'
import RollCreateModal from './RollModal'

/* 
 * Skill table.
 *    in: skills <- rules.skills
 *    in: scores <- sheet.skills
 *    out: setScores -> sheet.skills
 *    in: level <- sheet.level
 */

function SkillTable({skills, scores, setScores, level, editable = false, attributes, attributeScores}: {
    skills: Skill[],
    scores: Dictionary<number>,
    setScores(scores: Dictionary<number>): void,
    level: number,
    editable?: boolean,
    attributes: Attribute[],
    attributeScores: Dictionary<number>,
  }): JSX.Element {
  let totalCost = caltrops.skillCostTotal(scores)
  let maxCost = caltrops.skillCostMax(level)
  let sparePoints = maxCost - totalCost;

  const [rollInfo, setRollInfo] = useState(null as RollInfo | null)

  return (
    <div>
      <table className="table table-compact">
        <thead>
          <tr className='px-2'>
            <th>Skills</th>
            <th></th>
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
                    editable={editable}
                    isCapped={caltrops.skillIncrementCost(value) > sparePoints}
                    encourageUp={true}
                  />
                </td>
                <td>
                  <IconButton
                    icon="dice"
                    onClick={() => setRollInfo({ skill: { name: s.name, score: scores[s.name] ?? 0 } })}
                    enabled={!editable}
                  />
                </td>
              </tr>
          )})}
        </tbody>
        <tfoot>
          <tr className='px-2 text-center'>
            <th>Skill cost</th>
            <th>{totalCost} / {maxCost}</th>
            <th></th>
          </tr>
        </tfoot>
      </table>

      <RollCreateModal
        roll={rollInfo}
        close={() => setRollInfo(null)}
        attributes={attributes}
        scores={attributeScores}
      />
    </div>
  )
}

export default SkillTable