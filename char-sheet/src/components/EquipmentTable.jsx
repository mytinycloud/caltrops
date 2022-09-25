import caltrops from '../lib/caltrops'
import { modifyObject } from '../lib/util'
import PointEntryBox from './PointEntryBox'
import TextEntryBox from './TextEntryBox'

import {ImCross} from 'react-icons/im'

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
    <div className='px-8'>
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
                <td className='tooltip cursor-pointer border-none' data-tip="Remove">
                  <button className='btn btn-square btn-outline'
                    onClick={()=>{ setItems(modifyObject(items, slot.name, null)) }}
                  >
                  <ImCross 
                    size={10}
                    className='text-error'>
                  </ImCross>
                  </button>
                </td>
                </td>
              </tr>
            } else {
              return <tr>
                <td>{slot.name}</td>
                <td>
                  <button class='btn btn-outline btn-xs'
                    onClick={()=>(addItem(slot.name))}
                  >+</button>
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