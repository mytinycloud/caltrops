import React, { useState, useEffect } from 'react'
import airlockRuleset from '../data/airlocks'
import Table from '../components/Table'
import SkillTable from '../components/SkillTable'
import InfoTable from '../components/InfoTable'
import AttributeTable from '../components/AttributeTable'
import PowerTable from '../components/PowerTable'
import EquipmentTable from '../components/EquipmentTable'

import { setTheme, modifyObject } from '../lib/util'
import caltrops from '../lib/caltrops'

import { ImPencil, ImLock } from 'react-icons/im'


let defaultSheet = caltrops.newSheet(airlockRuleset);

/* 
  - Top level parent component responsible for all state management
  - Individual state fragments passed down into child components for updating etc
  - Itended to provide a single point of truth via which future API calls can be conducted 
    - (otherwise they'd end up being done in the children on an as-needed basis)
  - Further lookup and controlling logic can be split out into modules if desired
*/
function ParentalAdvisory() {
  const [rules, setRules] = useState(airlockRuleset)
  const [sheet, setSheet] = useState(defaultSheet)
  const [isEditable, setIsEditable] = useState(false);

  setTheme(rules.theme);

  // Placeholder object to test with:
  const [equipment, setEquipment] = useState({
    heading: ['Slot', 'Equipment', 'Count', 'Max'],
    content: [
      ['Shoulder Strap', 'Pistol', 1, 1],
      ['Vest Pocket #1', 'Pistol Ammunition', 2, 3],
      ['Vest Pocket #2', 'Fruit Juice', 1, 9],
    ]
  })

  return (
    <div>
      <button className='btn btn-ghost btn-square btn-md' onClick={() => setIsEditable(!isEditable)}>
      { isEditable
        ? <ImLock size={20}/>
        : <ImPencil size={20}/>
      }
      </button>

      {/* Character, attributes, status effects Info tables */}
      <section className='flex mx-4 justify-around basis-full mt-4'>
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
      </section>

      {/* Skills, spells, abilities, powers tables */}
      <section className='flex mx-4 justify-around basis-full mt-4'>
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
      <EquipmentTable
        equipment={rules.equipment}
        slots={rules.carrySlots}
        items={sheet.equipment}
        setItems={items => {setSheet(modifyObject(sheet, 'equipment', items))}}
      />
      </section>

    </div>
  )
}

export default ParentalAdvisory