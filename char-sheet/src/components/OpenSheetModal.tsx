// External imports
import { useState } from 'react'

// Components
import { Modal } from 'react-daisyui'
import { Sheet } from '../lib/rules';
import TextEntryBox from './TextEntryBox'
import server, { ServerItem } from '../lib/server'
import LoadingSpinner from './LoadingSpinner';


function LoadSheetModal({open, setOpen, setSheet, sheets, user}:{
    open: boolean,
    setOpen(open: boolean): void,
    setSheet(sheet: Sheet): void,
    sheets: ServerItem[] | null,
    user: string | null,
  }): JSX.Element | null {

  if (!open) {
    return null
  }

  function closeModal() {
    setOpen(false)
  }

  function selectSheet(item: ServerItem) {
    if (user) {
      server.read(user, item.id).then(s => {
        if (s != null) {
          setSheet(s.content)
        }
      })
    }
    closeModal()
  }

  return <Modal open={open} onClickBackdrop={closeModal}>
    <h1 className='font-bold text-2xl'>Open sheet</h1>
    
    {
      sheets ?
      <div className='scrollbar scrollbar-neutral flex w-full justify-center pr-4 mt-6'>
        { sheets.map( s => 
            <section className='card'>
              <button
                className='btn btn-primary w-80'
                onClick={() => selectSheet(s)}
              >{s.title}</button>
            </section>
        )}
      </div> :
      <LoadingSpinner/>
    }
  </Modal>
}


export default LoadSheetModal