import { useState } from 'react'

import FileUploader from '../components/FileUploader'
import MenuRibbon from '../components/MenuRibbon'
import SheetView from '../components/SheetView'

import { setTheme } from '../lib/util'
import caltrops from '../lib/caltrops'

/* 
  - Top level parent component responsible for all state management
  - Individual state fragments passed down into child components for updating etc
  - Itended to provide a single point of truth via which future API calls can be conducted 
    - (otherwise they'd end up being done in the children on an as-needed basis)
  - Further lookup and controlling logic can be split out into modules if desired
*/
function MainPage( { defaultSheet, defaultRules } ) {
  const [rules, setRules] = useState(defaultRules)
  const [sheet, setSheet] = useState(defaultSheet)
  const [editable, setEditable] = useState(false);
  
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

      <MenuRibbon
        editable={editable}
        setEditable={setEditable}
        sheet={sheet}
        setSheet={setSheetAndRules}
      >

      <SheetView
        rules={rules}
        sheet={sheet}
        setSheet={setSheet}
        editable={editable}
      />
      </MenuRibbon>

    </FileUploader>
  )
}

export default MainPage