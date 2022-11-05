// External imports
import { useState } from 'react'

// Components
import ModalFrame from './ModalFrame'
import TextEntryBox from './TextEntryBox'

// Internal imports
import caltrops from '../lib/caltrops'
import { SheetWound } from '../lib/rules'


function WoundSizeNames(maxSize: number): string[] {
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

function NewWoundModal({open, setOpen, addWound, maxSize=2}: {
    open: boolean,
    setOpen(open: boolean): void,
    addWound(wound: SheetWound): void,
    maxSize?: number,
  }): JSX.Element | null {

  const [name, setName] = useState("")

  if (!open) {
    return null
  }

  function closeModal() {
    setOpen(false)
    setName("")
  }

  function createWound(size: number) {
    closeModal()
    addWound(caltrops.woundCreate(size, name))
  }

  return <ModalFrame open={open} close={closeModal}>
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
            className={ i === 0 ? 'btn btn-primary' : 'btn' }
            onClick={ () => createWound(i+1) }
            disabled={ name.length <= 0 }
          >
          { sizeName }
        </button>
        })
      }
    </div>
  </ModalFrame>
}


export default NewWoundModal