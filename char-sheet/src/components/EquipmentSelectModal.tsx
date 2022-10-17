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

  const hasDescriptions = !equipment.every(e => e.description == null)

  if (!open) {
    return null
  }

  function closeModal() {
    setFilter("")
    setOpen(false)
  }

  return (
    <Modal open={open} onClickBackdrop={closeModal} className='flex flex-col m-4 h-full' style={{ width: "auto", maxWidth: "50rem"}}>
      <div className='m-2 flex justify-center'>
        <input
          className='input-sm input w-full max-w-xs input-bordered'
          type="text"
          value={filter}
          onChange={e => setFilter(e.target.value.toLowerCase())}
          placeholder="filter equipment"
          />
      </div>
      <div className='scrollbar scrollbar-neutral pr-4'>
        <table className="table table-compact">
          <thead>
            <tr>
              <th></th>
              <th className='w-32' >Equipment</th>
              <th>Stack</th>
              { hasDescriptions ? <th>Description</th> : null }
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
                  { hasDescriptions ? <td className='break-normal whitespace-normal'>{item.description ?? ""}</td> : null }
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