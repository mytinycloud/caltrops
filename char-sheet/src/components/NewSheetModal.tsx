// External imports
import { useState } from 'react'

// Components
import ActionModal from './ActionModal'
import TextEntryBox from './TextEntryBox'

// Internal imports
import caltrops from '../lib/caltrops'
import { Sheet } from '../lib/rules'


function NewSheetModal({open, close, setSheet}:{
    open: boolean,
    close(): void,
    setSheet(sheet: Sheet): void,
  }): JSX.Element | null {

  const rulesets = caltrops.listRules()
  const [ruleset, setRuleset] = useState(rulesets[0])
  const [name, setName] = useState("")

  if (!open) {
    return null
  }

  function closeModal() {
    close()
    setName("")
  }

  return <ActionModal
    open={open}
    close={closeModal}
    title="New character sheet"
    actions={[
      {
        name: "Create",
        type: "primary",
        disabled: name.length === 0,
        callback: () => setSheet(caltrops.newSheet(caltrops.loadRules(ruleset), name))
      }
    ]}
    >
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
            return <option key={name}>{name}</option>
          }
        )}
      </select>
    </div>
  </ActionModal>
}


export default NewSheetModal