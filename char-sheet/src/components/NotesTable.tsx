// Components
import IconButton from './IconButton'

// Internal imports
import { EditMode } from '../lib/util'
import ObjectService from '../lib/objectservice'

function NotesTable({service, editable=EditMode.Live}: {
    service: ObjectService,
    editable?: EditMode,
  }): JSX.Element {

  const notes: string[] = service.subscribe()

  return (
    <div>
      <table className="table table-compact w-80">
        <thead>
          <tr>
            <th>Notes</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {
          notes.map((note, i) => {
            return <tr key={i}>
              <td className='p-1 pb-0 w-full'>
                <textarea
                  className='textarea textarea-bordered leading-tight w-full scrollbar scrollbar-neutral p-2'
                  placeholder='Enter notes here'
                  value={note}
                  onChange={ evt => service.set_index(i, evt.target.value) }
                  disabled={!(editable >= EditMode.Live)}
                />
              </td>
              <td>
                <IconButton
                  icon="cross"
                  btnStyle="btn-outline btn-error"
                  onClick={() => service.remove_index(i)}
                  enabled={editable >= EditMode.Live}
                />
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
                onClick={() => {service.append_index("")}}
                enabled={editable >= EditMode.Live}
              />
              </div>
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default NotesTable