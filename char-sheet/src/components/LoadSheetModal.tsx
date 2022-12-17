// External imports
import { useState } from 'react'

// Components
import ModalFrame from './ModalFrame'
import { Sheet } from '../lib/rules';
import LoadingSpinner from './LoadingSpinner';
import { ImCross } from 'react-icons/im';

// Libraries
import caltrops from '../lib/caltrops'
import server, { ServerItem } from '../lib/server'
import { alertError } from '../lib/alerts'
import { timeSince } from '../lib/util';


function LoadSheetModal({open, setOpen, setSheet, sheets}:{
    open: boolean,
    setOpen(open: boolean): void,
    setSheet(sheet: Sheet | null): void,
    sheets: ServerItem[] | null,
  }): JSX.Element | null {

  if (!open) {
    return null
  }

  function closeModal() {
    setOpen(false)
  }

  function selectSheet(item: ServerItem) {
    setSheet(null)
    server.read(item.id).then(s => {
        setSheet( caltrops.loadSheet(s.content) )
    }).catch(e => alertError( `Error reading sheet: ${e.message}`))
    closeModal()
  }

  return <ModalFrame open={open} close={closeModal} title="Select sheet">
    {
      sheets == null ?
        <LoadingSpinner/> :
      !sheets.length ?
        "No sheets found" :
      <div className='scrollbar scrollbar-neutral flex flex-col items-center gap-2 mt-4'>
      {
        sheets.map( s => 
          <div className='flex flex-row gap-2 max-w-xl w-full'>
            <button
              className='btn btn-primary p-0 grow'
              onClick={() => selectSheet(s)}
            >
              <div>
                <h2 className='font-bold text-xl'>
                  {s.title}
                </h2>
                <section className='text-md normal-case'>
                  { timeSince(new Date(s.time))} ago
                </section>
              </div>
            </button>
            <button
              className='btn btn-outline btn-error btn-square'
            ><ImCross size={20}/></button>
          </div>
        )
      }
      </div>
    }
  </ModalFrame>
}


export default LoadSheetModal