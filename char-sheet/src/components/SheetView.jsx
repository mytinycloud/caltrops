
import SkillTable from './SkillTable'
import InfoTable from './InfoTable'
import AttributeTable from './AttributeTable'
import PowerTable from './PowerTable'
import EquipmentTable from './EquipmentTable'
import WoundTable from './WoundTable'

import { modifyObject } from '../lib/util'
import caltrops from '../lib/caltrops'

/* 
 * Sheet view. Contains all other sheet displaying components.
 */

function SheetView( { rules, sheet, setSheet, editable=false } ) {
  return (
    <div className='flex flex-wrap justify-center flex-row gap-4 basis-full p-4 scrollbar scrollbar-neutral'>

        {/* Info & Attributes */}
        <section className='flex gap-4 flex-col'>
          <InfoTable
            info={sheet.info}
            setInfo={info => {setSheet(modifyObject(sheet, 'info', info))}}
            editable={editable}
          />
          <AttributeTable
            attributes={rules.attributes}
            scores={sheet.attributes}
            setScores={scores => {setSheet(modifyObject(sheet, 'attributes', scores))}}
            level={sheet.info.level}
            editable={editable}
          />
        </section>

        {/* Skills */}
        <section className='flex gap-4 flex-col'>
          <SkillTable
            skills={rules.skills}
            scores={sheet.skills}
            setScores={scores => {setSheet(modifyObject(sheet, 'skills', scores))}}
            level={sheet.info.level}
            editable={editable}
          />
        </section>
        
        {/* Equipment column */}
        <section className='flex gap-4 flex-col'>
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
        </section>

        {/* Powers & wounds */}
        <section className='flex gap-4 flex-col'>
          {(() => {
            // This feels like a crime. This element is only included if powers are available
            const availablePowers = rules.powers.filter(p => caltrops.powerIsAvailable(p, sheet.skills));
            return availablePowers.length ?
              <PowerTable
                powers={availablePowers}
                powerDice={sheet.powers}
                skillScores={sheet.skills}
                setPowerDice={scores => {setSheet(modifyObject(sheet, 'powers', scores))}}
              /> :
               null
          })()}

          <WoundTable
            wounds={sheet.wounds}
            setWounds={wounds => {setSheet(modifyObject(sheet, 'wounds', wounds))}}
            woundCount={rules.woundCount}
            woundSizeLimit={rules.woundSizeLimit}
            editable={editable}
          />
        </section>
    </div>
  )
}

export default SheetView