// Components
import PointEntryBox from './PointEntryBox'

// Internal imports
import { modifyObject } from '../lib/util'
import caltrops from '../lib/caltrops'
import { Skill, Dictionary, RollInfo } from '../lib/rules'
import IconButton from './IconButton'

/* 
 * Skill table.
 *    in: skills <- rules.skills
 *    in: scores <- sheet.skills
 *    out: setScores -> sheet.skills
 *    in: level <- sheet.level
 */

function SkillTable({skills, scores, setScores, level, editable = false, roll}: {
    skills: Skill[],
    scores: Dictionary<number>,
    setScores(scores: Dictionary<number>): void,
    level: number,
    editable?: boolean,
    roll(info: RollInfo): void,
  }): JSX.Element {
  let totalCost = caltrops.skillCostTotal(scores)
  let maxCost = caltrops.skillCostMax(level)
  let sparePoints = maxCost - totalCost;


  function startRoll(skill: string): void {
    roll({ skill: { name: skill, score: scores[skill] ?? 0 }, bonus: 0 })
  }

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
              <tr className='hover cursor-pointer' onClick={editable ? undefined : () => startRoll(s.name)} >
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