import React, { useState, useEffect } from 'react'
import { Modal } from 'react-daisyui'

import {listRulesets, loadRuleset} from '../data/rulesets'
import caltrops from '../lib/caltrops'
import TextEntryBox from './TextEntryBox'

function NewSheetModal({open, setOpen, setSheet}) {

  const rulesets = listRulesets()
  const [ruleset, setRuleset] = useState(rulesets[0])
  const [name, setName] = useState("")

  function closeModal() {
    setOpen(false)
    setName("")
  }

  function createSheet() {
    const rules = loadRuleset(ruleset)
    const sheet = caltrops.newSheet(rules, name)

    closeModal()
    setSheet(sheet)
  }

  return <Modal open={open} onClickBackdrop={closeModal}>
    <h1 className='font-bold text-2xl'>New character sheet</h1>
    
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">Name character</span>
      </label>
      <TextEntryBox
        value={name}
        setValue={setName}
        limit={32}
        inputSize='input-md'
        placeholder='Character name here'
      ></TextEntryBox>

      <label className="label">
        <span className="label-text">Select ruleset</span>
      </label>
      <select className="select select-bordered" value={ruleset} onChange={e=>setRuleset(e.target.value)}>
        { rulesets.map( name => {
            return <option>{name}</option>
          }
        )}
      </select>
    </div>

    <div className='flex justify-center'>
      <button className='btn btn-primary m-4' onClick={createSheet}>
        Create
      </button>
    </div>
  </Modal>
}


export default NewSheetModal