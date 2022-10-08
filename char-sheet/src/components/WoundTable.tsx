// External imports
import { useState } from 'react'

// Components
import IconButton from './IconButton'
import NewWoundModal from './NewWoundModal'
import TreatWoundModal from './TreatWoundModal'
import { ImHeartBroken } from 'react-icons/im'

// Internal imports
import caltrops from '../lib/caltrops'
import { SheetWound } from '../lib/rules'


/* 
 * Equipment table.
 *    in: slots <- rules.wounds
 *    in: woundSlots <- sheet.wounds.count
 *    in: woundMaxSize <- sheet.wounds.
 *    out: setWounds -> sheet.wounds
 */
function WoundTable( {wounds, setWounds, woundCount=5, woundSizeLimit=2, editable=false}: {
    wounds: SheetWound[],
    setWounds(wounds: SheetWound[]): void,
    woundCount?: number,
    woundSizeLimit?: number,
    editable?: boolean
  }): JSX.Element | null {

  const [newWoundOpen, setNewWoundOpen] = useState(false)
  const [selected, setSelected] = useState(-1)

  function addWound(wound: SheetWound) {
    let new_wounds = [...wounds, wound]
    setWounds(new_wounds)
  }

  function removeWound(index: number) {
    let new_wounds = [...wounds]
    new_wounds.splice(index, 1)
    setWounds(new_wounds)
  }

  function editWound(index: number, wound: SheetWound) {
    let new_wounds = [...wounds]
    new_wounds[index] = wound
    setWounds(new_wounds)
  }

  function treatWound(success: boolean) {
    let index = selected
    let wound = caltrops.woundTreat(wounds[index], success)
    if (wound == null) {
      removeWound(index)
    }
    else{
      editWound(index, wound)
    }
  }

  const woundTotal = caltrops.woundTotal(wounds)

  return (
    <div>
      <table className="table table-compact w-64">
        <thead>
          <tr>
            <th colSpan={4}>Wounds</th>
          </tr>
        </thead>
        <tbody>
        {
          wounds.map((wound,n) => { 
            return <tr className='hover'>
              <td className='p-0'>
                <div>
                  {
                    Array(wound.size).fill(
                    <ImHeartBroken size={40} color='hsl(var(--er))' className='p-3'/>
                    )
                  }
                </div>
              </td>
              <td className='w-full'>
                <div>
                  {wound.name}
                </div>
              </td>
              <td>
                {
                  editable ? 
                <IconButton
                  icon='cross'
                  onClick={() => removeWound(n)}
                  btnStyle='btn-outline btn-error'
                /> :
                <IconButton
                  icon={wound.locked ? 'lock' : 'unlock' }
                  onClick={() => setSelected(n)}
                  enabled={!wound.locked}
                />
                }
              </td>
            </tr>
          })
        }
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={4}>
              <div className='flex justify-center'>
              <IconButton
                icon='plus'
                onClick={() => setNewWoundOpen(true)}
              />
              </div>
            </th>
          </tr>
        </tfoot>
      </table>

      <NewWoundModal
        open={newWoundOpen}
        setOpen={setNewWoundOpen}
        addWound={addWound}
        maxSize={woundSizeLimit}
      />
      <TreatWoundModal
        open={selected > -1}
        setOpen={() => setSelected(-1)}
        treatWound={treatWound}
      />
    </div>
  )
}

export default WoundTable