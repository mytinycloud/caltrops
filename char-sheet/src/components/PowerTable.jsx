import caltrops from '../lib/caltrops'
import { modifyObject } from '../lib/util'
import PointEntryBox from './PointEntryBox'
import TextEntryBox from './TextEntryBox'

/* 
 * Info table.
 * This consumes sheets.info for skill values.
 */

function PowerTable({powers, skillScores, powerDice, setPowerDice}) {
  return (
    <div className='px-8'>
      <h2 className='text-2xl my-4'>Powers</h2>
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
          powers.map((power) => {
            let diceMax = caltrops.powerDiceMax(power, skillScores)
            return <tr>
              <td>{power.name}</td>
              <td>{skillScores[power.source] ?? 0}</td>
              <td> <PointEntryBox
                value={powerDice[power.name] ?? 0}
                setValue={v => {setPowerDice(modifyObject(powerDice, power.name, v))}}
                max={diceMax}
                isEditable={true}
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