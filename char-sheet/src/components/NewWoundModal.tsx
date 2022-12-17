// External imports
import { useState } from 'react'

// Components
import ActionModal from './ActionModal'
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

function NewWoundModal({open, close, addWound, maxSize=2}: {
    open: boolean,
    close(): void,
    addWound(wound: SheetWound): void,
    maxSize?: number,
  }): JSX.Element | null {

  const [name, setName] = useState("")

  if (!open) {
    return null
  }

  function closeModal() {
    close()
    setName("")
  }

  return <ActionModal
    title="New Wound"
    open={open}
    close={closeModal}
    actions={
      WoundSizeNames(maxSize).map( (sizeName, i) => {
        return {
          callback: () => addWound(caltrops.woundCreate(i + 1, name)),
          disabled: name.length <= 0,
          name: sizeName,
          type: i === 0 ? 'primary' : undefined
        }
      })
    }
    >
    
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
  </ActionModal>
}


export default NewWoundModal