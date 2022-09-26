import caltrops from '../lib/caltrops'
import { modifyObject } from '../lib/util'
import PointEntryBox from './PointEntryBox'
import TextEntryBox from './TextEntryBox'

import IconButton from './IconButton'

/* 
 * Equipment table.
 *    in: equipment <- rules.equipment
 *    in: slots <- rules.carrySlots
 *    in: items <- sheet.equipment
 *    out: setItems -> sheet.equipment
 */
function EquipmentTable({equipment, slots, items, setItems}) {

  function addItem(slot){
    // TODO: select from equipment.
    let type = equipment[0]
    let item = {
      name: type.name,
      count: 1,
      stack: type.stack,
    }
    setItems(modifyObject( items, slot, item))
  }

  return (
    <div>
      <table className="table table-compact">
        <thead>
          <tr>
            <th>Slot</th>
            <th>Equipment</th>
            <th>Count</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {
          slots.map(slot => {
            let item = items[slot.name]
            if (item) {
              // TODO: use hidden buttons instead
              return <tr>
                <td>{slot.name}</td>
                <td>{item.name ?? '??'}</td>
                <td>
                  <PointEntryBox
                    value={item.count ?? 0}
                    setValue={ (v) => {} }
                    max={item.max ?? 1}
                  />
                </td>
                <td>
                  <IconButton
                    icon='cross'
                    onClick={() => {setItems(modifyObject(items, slot.name, null))}}
                    visible={true}
                    btnStyle='btn-outline btn-error'
                  />
                </td>
              </tr>
            } else {
              return <tr>
                <td>{slot.name}</td>
                <td>
                  <IconButton
                    icon='plus'
                    onClick={() => addItem(slot.name)}
                  />
                </td>
                <td></td>
              </tr>
            }
          })
        }
        </tbody>
      </table>
    </div>
  )
}

export default EquipmentTable