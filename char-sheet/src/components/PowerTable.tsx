// Components
import PointEntryBox from './PointEntryBox'

// Internal imports
import { modifyObject } from '../lib/util'
import caltrops from '../lib/caltrops'
import { Power, Dictionary } from '../lib/rules'

/* 
 * Power table.
 *   in: powers <- rules.powers for power metadata
 *   in: skillScores <- sheet.skills
 *   in: powerDice <- sheet.powers
 *   out: setPowerDice -> sheet.powers
 */

function PowerTable({powers, skillScores, powerDice, setPowerDice}: {
    powers: Power[],
    skillScores: Dictionary<number>,
    powerDice: Dictionary<number>,
    setPowerDice(dice: Dictionary<number>): void
  }): JSX.Element {
  return (
    <div>
      <table className="table table-compact">
        <thead>
          <tr>
            <th>Power</th>
            <th>Skill</th>
            <th>Dice</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {
          powers.map(power => {
            let diceMax = caltrops.powerDiceMax(power, skillScores)
            return <tr>
              <td>{power.name}</td>
              <td>{skillScores[power.source] ?? 0}</td>
              <td> <PointEntryBox
                value={powerDice[power.name] ?? 0}
                setValue={v => {setPowerDice(modifyObject(powerDice, power.name, v))}}
                max={diceMax}
                />
              </td>
              <td>/ {diceMax}</td>
            </tr>
          })
        }
        </tbody>
      </table>
    </div>
  )
}

export default PowerTable