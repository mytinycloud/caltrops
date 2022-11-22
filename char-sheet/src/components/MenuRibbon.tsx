// External imports
import React, { useState } from 'react'

// Components
import IconButton from './IconButton';
import NewSheetModal from './NewSheetModal';
import LoadSheetModal from './LoadSheetModal'
import { ImDownload3, ImFileEmpty, ImFloppyDisk, ImUser } from 'react-icons/im'

// Internal imports
import { downloadObject, saveObject } from '../lib/util'
import { Sheet } from '../lib/rules'
import server, { ServerItem } from '../lib/server'
import UserLoginModal from './UserLoginModal';
import caltrops from '../lib/caltrops';


function MenuRibbon( {editable, setEditable, sheet, setSheet, children}: {
    editable: boolean,
    setEditable(editable: boolean): void,
    sheet: Sheet | null,
    setSheet(sheet: Sheet | null): void,
    children?: React.ReactNode,
  }): JSX.Element {
  
  const [isNewSheetOpen, setIsNewSheetOpen] = useState(false)
  const [user, setUser] = useState(server.restoreLogin() as string | null)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isLoadSheetOpen, setIsLoadSheetOpen] = useState(false)
  const [sheetList, setSheetList] = useState(null as ServerItem[] | null)

  const menuItems = [
    <li>
      <button
        className='btn btn-ghost'
        onClick={() => {
          if (user) {
            setSheetList(null)
            server.list(user).then( s => setSheetList(s))
            setIsLoadSheetOpen(true)
          }
        }}
        disabled={!user}
      >
        <ImFileEmpty size={20}/>
        Load sheet
      </button>
    </li>,
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
        onClick={() => {
          saveObject("sheet", sheet)
          if (user && sheet) {
            server.write(user, sheet.id, sheet.info.name, sheet)
          }
        }}
        disabled={!sheet}
      >
        <ImFloppyDisk size={20}/>
        Save
      </button>
    </li>,
    <li>
      <button
        className='btn btn-ghost'
        onClick={() => {
            if (sheet) {
            downloadObject(sheet,
              `caltrops-${sheet.info.name.replace(' ', '-').toLowerCase()}.json`,
              true
            )
          }
        }}
        disabled={!sheet}
      >
        <ImDownload3 size={20}/>
        Download
      </button>
    </li>,
    <li>
    <button
      className='btn btn-ghost'
      onClick={ () => !user ? setIsLoginOpen(true) : server.logout().then(setUser) }
    >
      <ImUser size={20}/>
      {user ?? "Login"}
    </button>
  </li>,
  ]
  
  return (
  <div className="drawer">
    <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
    <div className="drawer-content flex flex-col">
      {/*<!-- Navbar -->*/}
      <div className="w-full navbar bg-base-300 min-h-12 my-0 p-0">
        <div className="flex-none lg:hidden">
          <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </label>
        </div>
        <div className="flex-1 px-2 mx-2">
        <IconButton
          icon={editable ? 'check' : 'edit'}
          btnStyle={editable ? 'btn-primary' : 'btn-ghost'}
          btnSize='btn-md'
          onClick={() => setEditable(!editable)}
        />
        </div>
        <div className="flex-none hidden lg:block">
          <ul className="menu menu-horizontal">
            { menuItems }
          </ul>
        </div>
      </div>
        {children}
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

    <UserLoginModal
      open={isLoginOpen}
      setOpen={setIsLoginOpen}
      setUser={u => server.login(u).then(setUser)}
      />

    <LoadSheetModal
      open={isLoadSheetOpen}
      setOpen={setIsLoadSheetOpen}
      setSheet={setSheet}
      user={user}
      sheets={sheetList}
    />
  </div>
  )
}

export default MenuRibbon