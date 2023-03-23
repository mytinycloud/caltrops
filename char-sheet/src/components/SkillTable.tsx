// Components
import PointEntryBox from './PointEntryBox'

// Internal imports
import { modifyObject, EditMode } from '../lib/util'
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

function SkillTable({skills, scores, setScores, level, editable = EditMode.Live, roll, setRoll}: {
    skills: Skill[],
    scores: Dictionary<number>,
    setScores(scores: Dictionary<number>): void,
    level: number,
    editable?: EditMode,
    roll: RollInfo,
    setRoll(info: RollInfo): void,
  }): JSX.Element {
  let totalCost = caltrops.skillCostTotal(scores)
  let maxCost = caltrops.skillCostMax(level)
  let sparePoints = maxCost - totalCost;


  function startRoll(skill: string): void {
    setRoll( modifyObject( roll, "skill", {
      name: skill,
      score: scores[skill] ?? 0,
    }))
  }

  if (!editable) {
    skills = skills.filter(s => caltrops.skillIsRollable(s, scores))
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
              <tr className='hover cursor-pointer'
                onClick={editable <= EditMode.Full ? () => startRoll(s.name) : undefined}
                key={s.name}
                >
                <td>{s.name}</td>
                <td className='text-center'>
                  <PointEntryBox
                    value={value}
                    setValue={(v) => {setScores(modifyObject(scores, s.name, v))}}
                    editable={editable >= EditMode.Full}
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