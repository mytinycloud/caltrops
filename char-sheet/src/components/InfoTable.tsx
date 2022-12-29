// Components
import PointEntryBox from './PointEntryBox'
import TextEntryBox from './TextEntryBox'

// Internal imports
import { modifyObject } from '../lib/util'
import { SheetInfo } from '../lib/rules'

/* 
 * Info table.
 *    in: info <- sheet.info
 *    out: setInfo -> sheet.info
 */
function InfoTable({info, setInfo, editable=false}: {
    info: SheetInfo,
    setInfo(info: SheetInfo): void,
    editable?:boolean
  }): JSX.Element {

  return (
    <div>
      <table className="table table-compact">
        <thead>
        <tr>
            <th>Info</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
          <tr className='hover' >
            <td>Name</td>
            <td className='py-0'><TextEntryBox
              value={info.name}
              setValue={v => { setInfo(modifyObject(info, 'name', v)) }}
              editable={editable}
              placeholder='enter name'
              />
            </td>
          </tr>
          <tr className='hover' >
            <td>Level</td>
            <td><PointEntryBox
              value={info.level}
              setValue={v => { setInfo(modifyObject(info, 'level', v)) }}
              editable={editable}
            /></td>
          </tr>
          <tr className='hover'>
            <td>Background</td>
            <td className='py-0'><TextEntryBox
              value={info.background}
              setValue={v => { setInfo(modifyObject(info, 'background', v)) }}
              editable={editable}
              placeholder='enter background'
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default InfoTable