import { useState } from 'react'

import IconButton from './IconButton'
import { Modal } from 'react-daisyui'


function EquipmentSelectModal({equipment, addEquipment, open, setOpen, enabled=true}) {

  const [filter, setFilter] = useState("")

  if (!open) {
    return []
  }

  function closeModal() {
    setFilter("")
    setOpen(false)
  }

  return (
    <Modal open={open} onClickBackdrop={closeModal}>
      <div className='m-2 flex justify-center'>
        <input
          className='input-sm input w-full max-w-xs input-bordered'
          type="text"
          value={filter}
          onChange={e => setFilter(e.target.value.toLowerCase())}
          placeholder="filter equipment"
          />
      </div>
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
                <td>{item.description ?? ""}</td>
              </tr>
            })
          }
        </tbody>
      </table>
    </Modal>
  )
}

export default EquipmentSelectModal