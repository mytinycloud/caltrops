import { useState } from 'react'

import IconButton from './IconButton';
import NewSheetModal from './NewSheetModal';
import { downloadObject, saveObject } from '../lib/util'

import { ImDownload3, ImFileEmpty, ImFloppyDisk } from 'react-icons/im'


function MenuRibbon( {editable, setEditable, sheet, setSheet, children} ) {
  const [isNewSheetOpen, setIsNewSheetOpen] = useState(false);

  const menuItems = [
    <li>
      <button
        className='btn btn-ghost'
        onClick={() => setIsNewSheetOpen(true)}
      >
        <ImFileEmpty size={20}/>
        New sheet
      </button>
    </li>,
    <li>
      <button
        className='btn btn-ghost'
        onClick={() => saveObject("sheet", sheet)}
      >
        <ImFloppyDisk size={20}/>
        Save
      </button>
    </li>,
    <li>
      <button
        className='btn btn-ghost'
        onClick={() => downloadObject(sheet,
          `caltrops-${sheet.info.name.replace(' ', '-').toLowerCase()}.json`,
          true
          )}
      >
        <ImDownload3 size={20}/>
        Download
      </button>
    </li>,
  ]
  
  return (
  <div className="drawer">
    <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
    <div className="drawer-content flex flex-col">
      {/*<!-- Navbar -->*/}
      <div className="w-full navbar bg-base-300 fixed z-20">
        <div className="flex-none lg:hidden">
          <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </label>
        </div>
        <div className="flex-1 px-2 mx-2">Navbar Title</div>
        <div className="flex-none hidden lg:block">
          <ul className="menu menu-horizontal">
            { menuItems }
          </ul>
        </div>
      </div>
      <div className='pt-14'>
        {children}
      </div>
    </div>
    <div className="drawer-side">
      <label htmlFor="my-drawer-3" className="drawer-overlay"></label> 
      <ul className="menu p-4 overflow-y-auto w-80 bg-base-100">
        { menuItems }
      </ul>
    </div>

    <NewSheetModal
      open={isNewSheetOpen}
      setOpen={setIsNewSheetOpen}
      setSheet={setSheet}
      />
  </div>
  )

  /*
  return [
  <div className='flex p-2 gap-2 fixed z-20'>

    <IconButton
      icon='menu'
      btnSize='btn-md'
      btnStyle=''
      onClick={() => setEditable(!editable)}
    />

    <IconButton
      icon={editable ? 'check' : 'edit'}
      btnStyle={editable ? 'btn-primary' : ''}
      btnSize='btn-md'
      onClick={() => setEditable(!editable)}
    />

    

      <IconButton
      icon='download'
      btnSize='btn-md'
      onClick={() => downloadObject(sheet,
      `caltrops-${sheet.info.name.replace(' ', '-').toLowerCase()}.json`,
      true
      )}
      />

      <IconButton
      icon='save'
      btnSize='btn-md'
      onClick={() => saveObject("sheet", sheet)}
      />
      <IconButton
      icon='file'
      btnSize='btn-md'
      onClick={() => setIsNewSheetOpen(true)}
      />

      
    </div>,
    <div className='h-16'>
    </div>
  ]
  */
}

export default MenuRibbon