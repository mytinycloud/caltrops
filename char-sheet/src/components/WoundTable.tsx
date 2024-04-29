// External imports
import { useState } from 'react'

// Components
import IconButton from './IconButton'
import NewWoundModal from './NewWoundModal'
import ActionModal from './ActionModal'
import { ImHeartBroken, ImHeart } from 'react-icons/im'

// Internal imports
import caltrops from '../lib/caltrops'
import { SheetWound, Container } from '../lib/rules'
import { EditMode } from '../lib/util'


/* 
 * Equipment table.
 *    in: slots <- rules.wounds
 *    in: woundSlots <- sheet.wounds.count
 *    in: woundMaxSize <- sheet.wounds.
 *    out: setWounds -> sheet.wounds
 */
function WoundTable( {wounds, setWounds, container, woundSizeLimit=2, useIndexedWounds=false, editable=EditMode.Live}: {
    wounds: SheetWound[],
    setWounds(wounds: SheetWound[]): void,
    container: Container,
    woundSizeLimit?: number,
    editable?: EditMode,
    useIndexedWounds: boolean,
  }): JSX.Element | null {

  const [newWoundOpen, setNewWoundOpen] = useState(false)
  const [selected, setSelected] = useState(-1)

  function findFreeWoundSlot(wounds: SheetWound[]): number {
    for (let i = 0; i < wounds.length; i++) {
      if (!wounds[i].name) {
        return i;
      }
    }
    return wounds.length;
  }

  const freeSlot = findFreeWoundSlot(wounds)
  
  function addWound(wound: SheetWound) {
    let new_wounds = [...wounds]
    new_wounds[freeSlot] = wound
    setWounds(new_wounds)
  }

  function removeWound(index: number) {
    if (useIndexedWounds) {
      if (index === wounds.length - 1) {
        // This is the last wound. We may need to trim the list.
        let remaining_wounds = wounds.length - 1;
        while (remaining_wounds > 0 && !wounds[remaining_wounds-1].name) { remaining_wounds-- }
        setWounds(wounds.slice(0, remaining_wounds))
      } else {
        // Replace with an unnamed wound.
        editWound(index, {
          size: wounds[index].size,
          locked: false,
        })
      }
    } else {
      // Just delete the wound.
      let new_wounds = [...wounds]
      new_wounds.splice(index, 1)
      setWounds(new_wounds)
    }
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
            <th colSpan={4}>Wounds: {container.name}</th>
          </tr>
        </thead>
        <tbody>
        {
          wounds.map((wound,n) => { 
            return <tr className='hover' key={n}>
              <td className='p-0'>
                <div>
                  {
                    Array(wound.size).fill(0).map( (i, n) =>
                      (n === (wound.size - 1) && !wound.locked)
                      ? <ImHeart size={40} color='hsl(var(--er))' className='p-3' key={n}/>
                      : <ImHeartBroken size={40} color='hsl(var(--er))' className='p-3' key={n}/>
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
                  editable >= EditMode.Full ? 
                <IconButton
                  icon='cross'
                  onClick={() => removeWound(n)}
                  btnStyle='btn-outline btn-error'
                /> :
                <IconButton
                  icon='heart'
                  onClick={() => setSelected(n)}
                  enabled={!wound.locked && editable >= EditMode.Live}
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
                enabled={editable >= EditMode.Live}
              />
              </div>
            </th>
          </tr>
        </tfoot>
      </table>

      <NewWoundModal
        open={newWoundOpen}
        close={() => setNewWoundOpen(false)}
        addWound={addWound}
        maxSize={woundSizeLimit}
      />

      <ActionModal
        open={selected > -1}
        close={() => setSelected(-1)}
        title="Treat wound"
        actions={[
          {
            name: "Treat",
            callback: () => treatWound(true),
            type: "success"
          }, {
            name: "Botch",
            callback: () => treatWound(false),
            type: "error"
          }
        ]}
      />
    </div>
  )
}

export default WoundTable