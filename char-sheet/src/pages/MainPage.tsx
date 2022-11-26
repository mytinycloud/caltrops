// External imports
import { useState } from 'react'

// Components
import FileUploader from '../components/FileUploader'
import MenuRibbon from '../components/MenuRibbon'
import SheetView from '../components/SheetView'
import AlertGroup from '../components/AlertGroup'

// Internal imports
import { setTheme } from '../lib/util'
import caltrops from '../lib/caltrops'
import { Sheet, Rules } from '../lib/rules'
import LoadingSpinner from '../components/LoadingSpinner'
import server from '../lib/server'
import { alertError } from '../lib/alerts'

/* 
  - Top level parent component responsible for all state management
  - Individual state fragments passed down into child components for updating etc
  - Itended to provide a single point of truth via which future API calls can be conducted 
    - (otherwise they'd end up being done in the children on an as-needed basis)
  - Further lookup and controlling logic can be split out into modules if desired
*/
function MainPage(): JSX.Element {

  function loadRules(): Rules {
    const last_rules = localStorage.getItem('caltrops-rules')
    return caltrops.loadRules(last_rules ?? undefined)
  }

  function loadSheet(): Sheet | null {
    let sheet_id = new URLSearchParams(window.location.search).get("sheet")
    if (!sheet_id) {
      sheet_id = localStorage.getItem('caltrops-sheet')
    }
    if (sheet_id) {
      server.read(sheet_id).then( sheet => {
          changeSheet(sheet.content)
        }
      ).catch(e => alertError(`Error reading sheet: ${e.message}`))
      return null
    }
    return caltrops.newSheet(rules)
  }

  const [rules, setRules] = useState(loadRules)
  const [sheet, setSheet] = useState(loadSheet)
  const [editable, setEditable] = useState(false);
  
  setTheme(rules.theme);

  function changeSheet(sheet: Sheet | null) {
    // Check if sheet.rules were changed, and load the new rules if so.
    if (sheet && sheet.rules !== rules.name) {
      const newRules = caltrops.loadRules(sheet.rules)
      setRules(newRules)
      localStorage.setItem('caltrops-rules', newRules.name)
      sheet.rules = newRules.name
    }
    if (sheet) {
      localStorage.setItem('caltrops-sheet', sheet.id)
    }
    setSheet(sheet)
  }

  return (
    <FileUploader setFile={changeSheet}>

      <MenuRibbon
        editable={editable}
        setEditable={setEditable}
        sheet={sheet}
        setSheet={changeSheet}
      >
        {
          sheet ?
          <SheetView
            rules={rules}
            sheet={sheet}
            setSheet={setSheet}
            editable={editable}
          /> :
          <LoadingSpinner size={100}/>
        }
      </MenuRibbon>

      <AlertGroup/>

    </FileUploader>
  )
}

export default MainPage