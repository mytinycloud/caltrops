import { useState } from 'react'
import caltrops from '../lib/caltrops'
import { modifyObject } from '../lib/util'
import PointEntryBox from './PointEntryBox'

import IconButton from './IconButton'
import EquipmentSelectModal from './EquipmentSelectModal'

/* 
 * Equipment table.
 *    in: equipment <- rules.equipment
 *    in: container <- rules.containers[n]
 *    in: items <- sheet.equipment[container.name]
 *    out: setItems -> sheet.equipment[container.name]
 */
function EquipmentTable({equipment, container, items, setItems}) {

  const freeCapacity = container.size ? (container.size - items.length) : 1
  const [modalOpen, setModalOpen] = useState(false)

  function addItem(equipment) {
    // TODO: select from equipment.
    let item = {
      name: equipment.name,
    }

    if (equipment.stack) {
      item.count = 1
      item.stack = equipment.stack
    }
    setItems([...items, item])
  }

  function editItem(index, item) {
    let new_items = [...items]
    new_items[index] = item
    setItems(new_items)
  }

  function removeItem(index) {
    let new_items = [...items]
    new_items.splice(index, 1)
    setItems(new_items)
  }

  return (
    <div>
      <table className="table table-compact w-64">
        <thead>
          <tr>
            <th colSpan='4'>Items: {container.name}</th>
          </tr>
        </thead>
        <tbody>
        {
          items.map((item, i) => {
            return <tr className='hover'>
              <td>
                {item.name}
              </td>
              <td>
                <PointEntryBox
                  value={item.count ?? 0}
                  setValue={ v => { editItem(i, modifyObject(item, 'count', v)) } }
                  max={item.stack ?? 1}
                  visible={(item.stack ?? 1) > 1}
                />
              </td>
              <td>
                <IconButton
                  icon='cross'
                  onClick={() => { removeItem(i) }}
                  btnStyle='btn-outline btn-error'
                />
              </td>
            </tr>
          })
        }
        </tbody>
        <tfoot>
          <tr>
            <th colSpan='4'>
              <div className='flex justify-center'>
              <IconButton
                icon='plus'
                enabled={freeCapacity > 0}
                onClick={() => {setModalOpen(true)}}
              />
              </div>
            </th>
          </tr>
        </tfoot>
      </table>

      <EquipmentSelectModal
        open={modalOpen}
        setOpen={setModalOpen}
        enabled={freeCapacity > 0}
        equipment={equipment}
        addEquipment={addItem}
      />
    </div>
  )
}

export default EquipmentTable