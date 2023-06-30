// External imports
import { useEffect, useRef, useState } from 'react'
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd'

// Components
import PointEntryBox from './PointEntryBox'
import IconButton from './IconButton'
import EquipmentSelectModal from './EquipmentSelectModal'
import TextEntryBox from './TextEntryBox'

// Internal imports
import { Equipment, Container, SheetEquipment, Sheet } from '../lib/rules'
import caltrops from '../lib/caltrops'
import { EditMode, modifyObject } from '../lib/util'
import { EquipmentRow } from './EquipmentRow'

/* 
 * Equipment table.
 *    in: equipment <- rules.equipment
 *    in: container <- rules.containers[n]
 *    in: items <- sheet.equipment[container.name]
 *    out: setItems -> sheet.equipment[container.name]
 */
function EquipmentTable({equipment, container, items, setItems, editable=EditMode.Live}: {
    equipment: Equipment[],
    container: Container,
    items: SheetEquipment[],
    setItems(items: SheetEquipment[]): void,
    editable?: EditMode
  }): JSX.Element {

  const freeCapacity = container.size ? (container.size - items.length) : 1
  const capacityUnlocked = freeCapacity < 0
  const [modalOpen, setModalOpen] = useState(false);

  function addItem(equipment: Equipment) {
    let item: SheetEquipment = {
      name: equipment.name,
    }
    if (equipment.custom) {
      item.custom = true
    }
    if (equipment.stack) {
      item.count = 1
      item.stack = equipment.stack
    }
    setItems([...items, item])
  }

  function editItem(index: number, item: SheetEquipment) {
    let new_items = [...items]
    new_items[index] = item
    setItems(new_items)
  }

  function removeItem(index: number) {
    let new_items = [...items]
    new_items.splice(index, 1)
    setItems(new_items)
  }

  function handleDrop(item: SheetEquipment) {
    const itemCount = item.count || 1
    const amountToAdd = capacityUnlocked ? itemCount : Math.min(itemCount, item.stack || 1)
    const newItem = modifyObject(item, 'count', amountToAdd)
    const oldItem = modifyObject(item, 'count', itemCount - amountToAdd)

    setItems([...items, newItem]);

    return oldItem
  }

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'equipment',
    drop: handleDrop,
    canDrop: () => freeCapacity > 0,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }, [])

  return (
    <div ref={drop}>
      <table className="table table-compact w-64">
        <thead>
          <tr>
            <th colSpan={4}>Items: {container.name}</th>
          </tr>
        </thead>
        <tbody>
        {
          items.map((item, i) => {
            return <EquipmentRow
              sheetEquipment={item}
              onEdit={(item) => { editItem(i, item) }}
              onRemove={() => { removeItem(i) }}
              editable={editable}
              unlockStackSize={container.size === -1}
              key={i}
            />
          })
        }
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={4}>
              <div className='flex justify-center'>
              <IconButton
                icon='plus'
                  enabled={editable >= EditMode.Live && freeCapacity !== 0}
                onClick={() => {setModalOpen(true)}}
              />
              </div>
            </th>
          </tr>
        </tfoot>
      </table>

      <EquipmentSelectModal
        open={modalOpen}
        close={() => setModalOpen(false)}
        enabled={editable >= EditMode.Live && freeCapacity !== 0}
        equipment={modalOpen ? caltrops.equipmentFilter(equipment, container.tags) : []}
        addEquipment={addItem}
      />
    </div>
  )
}

export default EquipmentTable