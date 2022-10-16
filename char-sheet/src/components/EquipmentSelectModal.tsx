// External imports
import { useState } from 'react'

// Components
import IconButton from './IconButton'
import { Modal } from 'react-daisyui'

// Interal imports
import { Equipment, SheetEquipment } from '../lib/rules'

function EquipmentSelectModal({equipment, addEquipment, open, setOpen, enabled=true}: {
    equipment: Equipment[],
    addEquipment(item: SheetEquipment): void,
    open: boolean,
    setOpen(open: boolean): void,
    enabled?: boolean,
  }): JSX.Element | null {

  const [filter, setFilter] = useState("")

  if (!open) {
    return null
  }

  function closeModal() {
    setFilter("")
    setOpen(false)
  }

  return (
    <Modal open={open} onClickBackdrop={closeModal} className='flex flex-col max-w-5xl'>
      <div className='m-2 flex justify-center'>
        <input
          className='input-sm input w-full max-w-xs input-bordered'
          type="text"
          value={filter}
          onChange={e => setFilter(e.target.value.toLowerCase())}
          placeholder="filter equipment"
          />
      </div>
      <div className='scrollbar scrollbar-neutral pr-2'>
        <table className="table table-compact">
          <thead>
            <tr>
              <th></th>
              <th>Equipment</th>
              <th>Stack</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {
              equipment.filter( item => item.name
                        .toLowerCase()
                        .includes(filter))
                        .map( item => {
                return <tr className='hover'>
                  <td><IconButton
                    icon='plus'
                    enabled={enabled}
                    onClick={() => { addEquipment(item) } }
                  /></td>
                  <td>{item.name}</td>
                  <td>{item.stack ?? ""}</td>
                  <td className='break-normal whitespace-normal'>{item.description ?? ""}</td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </Modal>
  )
}

export default EquipmentSelectModal