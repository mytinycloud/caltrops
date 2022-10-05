import { useState } from 'react'
import { Modal } from 'react-daisyui'

import caltrops from '../lib/caltrops'
import TextEntryBox from './TextEntryBox'

function WoundSizeNames(maxSize) {
  if (maxSize <= 1) {
    return [ "Create" ]
  }
  else {
    return [
      'Minor',
      'Major',
      'Mortal',
    ].slice(0, maxSize)
  }
}

function NewWoundModal({open, setOpen, addWound, maxSize=2}) {

  const [name, setName] = useState("")

  if (!open) {
    return []
  }

  function closeModal() {
    setOpen(false)
    setName("")
  }

  function createWound(size) {
    closeModal()
    addWound(caltrops.woundCreate(size, name))
  }

  return <Modal open={open} onClickBackdrop={closeModal}>
    <h1 className='font-bold text-2xl'>New wound</h1>
    
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">Description</span>
      </label>
      <TextEntryBox
        value={name}
        setValue={setName}
        limit={32}
        inputSize='input-md'
        placeholder='enter wound description'
      ></TextEntryBox>
    </div>

    <label className="label mt-4">
        <span className="label-text">Size</span>
    </label>
    <div className='flex gap-8 justify-center'>
      {
        WoundSizeNames(maxSize).map( (sizeName, i) => {
        return <button
            className={ 'btn' }
            onClick={ () => createWound(i+1) }
            disabled={name.length <= 0}
          >
          { sizeName }
        </button>
        })
      }
    </div>
  </Modal>
}


export default NewWoundModal