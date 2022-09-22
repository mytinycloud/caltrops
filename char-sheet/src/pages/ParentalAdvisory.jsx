import React, { useState, useEffect } from 'react'
import { airlockRuleset } from '../data/airlocks'
import Table from '../components/Table'
import SkillTable from '../components/SkillTable'
import { setTheme } from '../lib/util'

/* 
  - Top level parent component responsible for all state management
  - Individual state fragments passed down into child components for updating etc
  - Itended to provide a single point of truth via which future API calls can be conducted 
    - (otherwise they'd end up being done in the children on an as-needed basis)
  - Further lookup and controlling logic can be split out into modules if desired
*/
function ParentalAdvisory() {

  const [rules, setRules] = useState(airlockRuleset)
  const [sheet, setSheet] = useState({
      rules: rules.name,
      info: {
        name: 'Adam Smasher',
        level: 3,
        age: 25,
        background: '',
        description: '',
      },
      equipment: [],
      skills: {}
  })

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
      <h1 className='text-center font-bold text-4xl mt-20'> {`${sheet.info.name} Character Sheet`} </h1>
      <h2 className='text-center mt-4'> {`Spacer-Bard Gene Splicer`} </h2>
      {/* Character, attributes, status effects Info tables */}
      <section className='flex mx-4 justify-around basis-full mt-20'>
        <SkillTable
          skills={rules.skills}
          scores={sheet.skills}
          setScores={(scores) => {}}
        />
        <Table
          title={'Equipment'}
          data={equipment}
        />
      </section>

      {/* Skills, spells, abilities, powers tables */}
      <section className=''>

      </section>

      {/* Equipment table */}
      <section className=''>

      </section>

    </div>
  )
}

export default ParentalAdvisory