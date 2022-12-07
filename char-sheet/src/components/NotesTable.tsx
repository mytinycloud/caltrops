// Components
import IconButton from './IconButton'

// Internal imports
import { modifyObject } from '../lib/util'

/* 
 * Power table.
 *   in: notes <- sheet.notes
 *   out: setNotes -> sheet.notes
 */

function NotesTable({notes, setNotes}: {
    notes: string[],
    setNotes(notes: string[]): void
  }): JSX.Element {

  function createNote() {
    setNotes([...notes, ""])
  }

  function editNote(index: number, content: string) {
    let new_notes = [...notes]
    new_notes[index] = content
    setNotes(new_notes)
  }

  function deleteNote(index: number) {
    setNotes(notes.filter( (_, i) => i !== index ))
  }

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
                  onChange={ evt => editNote(i, evt.target.value) }
                />
              </td>
              <td>
                <IconButton
                  icon="cross"
                  btnStyle="btn-outline btn-error"
                  onClick={() => deleteNote(i)}
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
                onClick={() => {createNote()}}
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