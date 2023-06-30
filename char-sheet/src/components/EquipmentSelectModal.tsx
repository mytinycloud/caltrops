// External imports
import { useState } from 'react'

// Components
import IconButton from './IconButton'
import { Modal } from 'react-daisyui'
import { ImCross } from 'react-icons/im'
import TextEntryBox from './TextEntryBox'
import ActionModal from './ActionModal'

// Interal imports
import { Equipment, SheetEquipment } from '../lib/rules'
import { modifyObject } from '../lib/util'

function EquipmentSelectModal({equipment, addEquipment, open, close, enabled=true}: {
    equipment: Equipment[],
    addEquipment(item: SheetEquipment): void,
    open: boolean,
    close(): void,
    enabled?: boolean,
  }): JSX.Element | null {

  const [filter, setFilter] = useState("")
  const [customEquipment, setCustomEquipment] = useState(null as Equipment | null)

  const hasDescriptions = !equipment.every(e => e.description == null)

  if (!open) {
    return null
  }

  function closeModal() {
    setCustomEquipment(null)
    setFilter("")
    close()
  }

  return (
    <Modal open={open} onClickBackdrop={closeModal} className='flex flex-col h-full' style={{ width: "100%", maxWidth: "50rem"}} responsive={true}>
      
      <button
        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        onClick={closeModal}
        >
        <ImCross size={14}/>
      </button>
      
      <div className='m-2 flex justify-center'>
        <input
          className='input-sm input w-full max-w-xs input-bordered'
          type="text"
          value={filter}
          onChange={e => setFilter(e.target.value.toLowerCase())}
          placeholder="filter equipment"
          />
      </div>
      <div className='scrollbar scrollbar-neutral w-full pr-4'>
        <table className="table table-compact w-full">
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
                return <tr className='hover' key={item.name}>
                  <td><IconButton
                    icon='plus'
                    enabled={enabled}
                    onClick={() => { item.custom ? setCustomEquipment(modifyObject(item, "name", "")) : addEquipment(item) } }
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

      <ActionModal
        title="New item"
        open={customEquipment != null}
        close={() => setCustomEquipment(null)}
        actions={[
          {
            name: "Create",
            type: "primary",
            callback: () => addEquipment(customEquipment as Equipment),
            disabled: !(customEquipment?.name.length),
          }
        ]}
      >
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Name item</span>
          </label>
          <TextEntryBox
            value={customEquipment?.name ?? ""}
            setValue={v => setCustomEquipment(modifyObject(customEquipment as Equipment, "name", v))}
            limit={32}
            inputSize='input-md'
            placeholder='Item name'
          ></TextEntryBox>
        </div>
      </ActionModal>

    </Modal>
  )
}

export default EquipmentSelectModal