import caltrops from '../lib/caltrops'
import { modifyObject } from '../lib/util'
import PointEntryBox from './PointEntryBox'
import TextEntryBox from './TextEntryBox'

import IconButton from './IconButton'

/* 
 * Equipment table.
 *    in: slots <- rules.wounds
 *    in: wounds <-sheet.wounds
 *    out: setWounds -> sheet.wounds
 */
function WoundTable({slots, wounds, setWounds}) {

  function insertWound(size) {
    let new_wounds = [...wounds]
    new_wounds.push(caltrops.woundCreate(size))
    setWounds(new_wounds)
  }

  function removeWound(index) {
    let new_wounds = [...wounds]
    new_wounds.splice(index, 1)
    setWounds(new_wounds)
  }

  function editWound(index, wound) {
    let new_wounds = [...wounds]
    new_wounds[index] = wound
    setWounds(new_wounds)
  }

  const woundTotal = caltrops.woundTotal(wounds)

  return (
    <div>
      <table className="table table-compact">
        <thead>
          <tr>
            <th>Wound</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {
          wounds.map((wound,n) => {
            let padding = wound.size > 1 ? "py-0" : "py-6"
            return <tr>
              <td className={padding}>
                <TextEntryBox
                  value={wound.name}
                  setValue={ v => editWound(n, { ...wound, name: v })}
                  placeholder="enter wound type"
                  />
              </td>
              <td>
                <IconButton
                  icon='cross'
                  onClick={() => removeWound(n)}
                  btnStyle='btn-outline btn-error'
                />
              </td>
            </tr>
          })
        }
        </tbody>
        <tfoot>
          <tr>
            <th>
              <IconButton
                icon='plus'
                onClick={() => insertWound(1)}
              />
            </th>
            <th>
              <IconButton
                icon='plus'
                onClick={() => insertWound(2)}
              />
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default WoundTable