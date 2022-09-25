import { modifyObject } from '../lib/util'
import PointEntryBox from './PointEntryBox'
import TextEntryBox from './TextEntryBox'

/* 
 * Info table.
 *    in: info <- sheet.info
 *    out: setInfo -> sheet.info
 */

function InfoTable({info, setInfo, isEditable=false}) {

  return (
    <div className='px-8'>
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
            <td>
            <TextEntryBox
              value={info.name}
              setValue={v => { setInfo(modifyObject(info, 'name', v)) }}
              isEditable={isEditable}
              />
            </td>
          </tr>
          <tr className='hover' >
            <td>Level</td>
            <td><PointEntryBox
              value={info.level}
              setValue={v => { setInfo(modifyObject(info, 'level', v)) }}
              isEditable={isEditable}
            /></td>
          </tr>
          <tr className='hover'>
            <td>Background</td>
            <td><TextEntryBox
              value={info.background}
              setValue={v => { setInfo(modifyObject(info, 'background', v)) }}
              isEditable={isEditable}
              />
            </td>
          </tr>
          <tr className='hover'>
            <td>Funds</td>
            <td><TextEntryBox
              value={info.funds}
              setValue={v => { setInfo(modifyObject(info, 'funds', v)) }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default InfoTable