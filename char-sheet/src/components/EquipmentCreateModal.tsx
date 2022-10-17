// External imports
import { useState } from 'react'

// Components
import TextEntryBox from './TextEntryBox';
import { Modal } from 'react-daisyui'

// Interal imports
import { Equipment, SheetEquipment } from '../lib/rules'

function EquipmentCreateModal({equipment, addEquipment, open, setOpen}: {
    equipment: Equipment,
    addEquipment(item: SheetEquipment): void,
    open: boolean,
    setOpen(open: boolean): void,
    enabled?: boolean,
  }): JSX.Element | null {

  const [name, setName] = useState("");

  if (!open) {
    return null
  }

  function closeModal() {
    setOpen(false)
    setName("")
  }

  function createEquipment() {
    addEquipment({
      ...equipment,
      name: name
    })
    closeModal()
  }

  return <Modal open={open} onClickBackdrop={closeModal}>
    <h1 className='font-bold text-2xl'>New item</h1>
    
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">Name item</span>
      </label>
      <TextEntryBox
        value={name}
        setValue={setName}
        limit={32}
        inputSize='input-md'
        placeholder='Item name'
      ></TextEntryBox>
    </div>

    <div className='flex justify-center'>
      <button
        className='btn m-4 btn-primary'
        onClick={createEquipment}
        disabled={name.length === 0}
      >
        Create
      </button>
    </div>
  </Modal>
}

export default EquipmentCreateModal