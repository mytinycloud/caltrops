// External imports
import { useState } from 'react'

// Components
import SkillTable from './SkillTable'
import InfoTable from './InfoTable'
import AttributeTable from './AttributeTable'
import PowerTable from './PowerTable'
import EquipmentTable from './EquipmentTable'
import WoundTable from './WoundTable'
import RollCreateModal from './RollModal'
import NotesTable from './NotesTable'
import CurrencyTable from './CurrencyTable'

// Internal imports
import ObjectService from '../lib/objectservice'
import { EditMode } from '../lib/util'
import caltrops from '../lib/caltrops'
import { RollInfo, Rules, Sheet } from '../lib/rules'

/* 
 * Sheet view. Contains all other sheet displaying components.
 */

function SheetView( { rules, sheetService, editable=EditMode.Live }: {
    rules: Rules,
    sheetService: ObjectService,
    editable?: EditMode
  }): JSX.Element {

  const [roll, setRoll] = useState({} as RollInfo)
  const rollService = new ObjectService(roll, setRoll)
  const sheet: Sheet = sheetService.subscribe()

  return (
    <div className='flex flex-wrap justify-center flex-row gap-4 basis-full p-4 scrollbar scrollbar-neutral'>

        {/* Info & Attributes */}
        <section className='flex gap-4 flex-col'>
          <InfoTable
            service={sheetService.child('info')}
            editable={editable}
          />
          <CurrencyTable
            currencies={rules.currency}
            service={sheetService.child('currency')}
            editable={editable}
          />
          <AttributeTable
            rules={rules}
            level={sheet.info.level}
            service={sheetService.child('attributes')}
            editable={editable}
            rollService={rollService}
          />
        </section>

        {/* Skills */}
        <section className='flex gap-4 flex-col'>
          <SkillTable
            skills={rules.skills}
            service={sheetService.child('skills')}
            maxCostTotal={caltrops.skillCostMax(rules, sheet.info.level)}
            editable={editable}
            rollService={rollService}
          />
        </section>
        
        {/* Equipment column */}
        <section className='flex gap-4 flex-col'>
        {
          rules.containers.map( container => {
            return <EquipmentTable
              equipment={rules.equipment}
              container={container}
              service={sheetService.navigate(['equipment', container.name])}
              editable={editable}
              key={`equipment-${container.name}-table`}
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
                skillScores={sheet.skills}
                service={sheetService.child('powers')}
                editable={editable}
                key='power-table'
              /> :
               null
          })()}

          {(() => {
            return rules.wounds.map( w =>
            <WoundTable
              key={w.name}
              service={sheetService.navigate(['wounds', w.name])}
              container={w}
              woundSizeLimit={rules.woundSizeLimit}
              editable={editable}
            />
          )})()}
        </section>
        
        {/* Notes */}
        <section className='flex gap-4 flex-col'>
          <NotesTable
            service={sheetService.child('notes')}
            editable={editable}
          />
        </section>

        <RollCreateModal
          rollService={rollService}
          useAspects={rules.useAspects}
          attributes={rules.attributes}
          scores={sheet.attributes}
        />
    </div>
  )
}

export default SheetView