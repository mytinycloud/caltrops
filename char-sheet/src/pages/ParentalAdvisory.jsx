import { useState } from 'react'

import SkillTable from '../components/SkillTable'
import InfoTable from '../components/InfoTable'
import AttributeTable from '../components/AttributeTable'
import PowerTable from '../components/PowerTable'
import EquipmentTable from '../components/EquipmentTable'
import IconButton from '../components/IconButton'
import WoundTable from '../components/WoundTable'
import FileUploader from '../components/FileUploader'
import NewSheetModal from '../components/NewSheetModal'

import { setTheme, modifyObject, downloadObject, saveObject } from '../lib/util'
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
  const [isEditable, setIsEditable] = useState(false);

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
          icon={isEditable ? 'check' : 'edit'}
          btnStyle={isEditable ? 'btn-primary' : 'btn-primary'}
          btnSize='btn-md'
          onClick={() => setIsEditable(!isEditable)}
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

      {/* Character, attributes, status effects Info tables */}
      <section className='flex flex-wrap justify-around gap-4 basis-full mt-4'>
        <InfoTable
          info={sheet.info}
          setInfo={info => {setSheet(modifyObject(sheet, 'info', info))}}
          isEditable={isEditable}
        />
        <AttributeTable
          attributes={rules.attributes}
          scores={sheet.attributes}
          setScores={scores => {setSheet(modifyObject(sheet, 'attributes', scores))}}
          level={sheet.info.level}
          isEditable={isEditable}
        />
        <SkillTable
          skills={rules.skills}
          scores={sheet.skills}
          setScores={scores => {setSheet(modifyObject(sheet, 'skills', scores))}}
          level={sheet.info.level}
          isEditable={isEditable}
        />
        {(() => {
          // This feels like a crime
          const availablePowers = rules.powers.filter(p => caltrops.powerIsAvailable(p, sheet.skills));
          return availablePowers.length ? <PowerTable
            powers={availablePowers}
            powerDice={sheet.powers}
            skillScores={sheet.skills}
            setPowerDice={scores => {setSheet(modifyObject(sheet, 'powers', scores))}}
          /> : null
        })()}
        {
          rules.containers.map( container => {
            return <EquipmentTable
              equipment={rules.equipment}
              container={container}
              items={sheet.equipment[container.name] ?? []}
              setItems={items => {setSheet(modifyObject(sheet, 'equipment', modifyObject(sheet.equipment, container.name, items)))}}
          />
          } )
        }
      <WoundTable
        slots={rules.wounds}
        wounds={sheet.wounds}
        setWounds={wounds => {setSheet(modifyObject(sheet, 'wounds', wounds))}}
      />
      </section>

    <NewSheetModal
      open={isNewSheetOpen}
      setOpen={setIsNewSheetOpen}
      setSheet={setSheetAndRules}
    />

    </FileUploader>
  )
}

export default ParentalAdvisory