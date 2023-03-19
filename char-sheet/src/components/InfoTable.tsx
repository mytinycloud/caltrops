// Components
import PointEntryBox from './PointEntryBox'
import TextEntryBox from './TextEntryBox'

// Internal imports
import { modifyObject, EditMode } from '../lib/util'
import { SheetInfo } from '../lib/rules'

/* 
 * Info table.
 *    in: info <- sheet.info
 *    out: setInfo -> sheet.info
 */
function InfoTable({info, setInfo, editable=EditMode.Live}: {
    info: SheetInfo,
    setInfo(info: SheetInfo): void,
    editable?:EditMode
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
              editable={editable >= EditMode.Full}
              placeholder='enter name'
              />
            </td>
          </tr>
          <tr className='hover' >
            <td>Level</td>
            <td><PointEntryBox
              value={info.level}
              setValue={v => { setInfo(modifyObject(info, 'level', v)) }}
              editable={editable >= EditMode.Full}
            /></td>
          </tr>
          <tr className='hover'>
            <td>Background</td>
            <td className='py-0'><TextEntryBox
              value={info.background}
              setValue={v => { setInfo(modifyObject(info, 'background', v)) }}
              editable={editable >= EditMode.Full}
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