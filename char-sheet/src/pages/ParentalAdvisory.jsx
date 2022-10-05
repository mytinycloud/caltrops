import { useState } from 'react'

import IconButton from '../components/IconButton'
import FileUploader from '../components/FileUploader'
import NewSheetModal from '../components/NewSheetModal'
import SheetView from '../components/SheetView'

import { setTheme, downloadObject, saveObject } from '../lib/util'
import caltrops from '../lib/caltrops'

/* 
  - Top level parent component responsible for all state management
  - Individual state fragments passed down into child components for updating etc
  - Itended to provide a single point of truth via which future API calls can be conducted 
    - (otherwise they'd end up being done in the children on an as-needed basis)
  - Further lookup and controlling logic can be split out into modules if desired
*/
function ParentalAdvisory( { defaultSheet, defaultRules } ) {
  const [rules, setRules] = useState(defaultRules)
  const [sheet, setSheet] = useState(defaultSheet)
  const [editable, setEditable] = useState(false);

  const [isNewSheetOpen, setIsNewSheetOpen] = useState(false);
  
  setTheme(rules.theme);

  function setSheetAndRules(sheet) {
    // Check if sheet.rules were changed, and load the new rules if so.
    if (sheet.rules !== rules.name) {
      const newRules = caltrops.loadRules(sheet.rules)
      setRules(newRules)
      sheet.rules = newRules.name
    }
    setSheet(sheet)
  }

  return (
    <FileUploader setFile={setSheetAndRules}>

      <section className='flex'>
        <IconButton
          icon={editable ? 'check' : 'edit'}
          btnStyle={editable ? 'btn-primary' : 'btn-primary'}
          btnSize='btn-md'
          onClick={() => setEditable(!editable)}
        />
        <IconButton
          icon='download'
          btnSize='btn-md'
          onClick={() => downloadObject(sheet,
            `caltrops-${sheet.info.name.replace(' ', '-').toLowerCase()}.json`,
            true
            )}
        />
        <IconButton
          icon='save'
          btnSize='btn-md'
          onClick={() => saveObject("sheet", sheet)}
        />
        <IconButton
          icon='file'
          btnSize='btn-md'
          onClick={() => setIsNewSheetOpen(true)}
        />
      </section>

      <SheetView
        rules={rules}
        sheet={sheet}
        setSheet={setSheet}
        editable={editable}
      />

      <NewSheetModal
        open={isNewSheetOpen}
        setOpen={setIsNewSheetOpen}
        setSheet={setSheetAndRules}
      />

    </FileUploader>
  )
}

export default ParentalAdvisory