// External imports
import { useState } from 'react'
import server from '../lib/server'

// Components
import ModalFrame from './ModalFrame'
import TextEntryBox from './TextEntryBox'


function UserLoginModal({open, setOpen, setUser}:{
    open: boolean,
    setOpen(open: boolean): void,
    setUser(user: string | null): void,
  }): JSX.Element | null {

  const [token, setToken] = useState("")
  const username = server.parseToken(token.trim())

  if (!open) {
    return null
  }

  function closeModal() {
    setToken("");
    setOpen(false)
  }

  function login() {
    setUser(token.trim())
    closeModal()
  }

  return <ModalFrame open={open} close={closeModal}>
    <h1 className='font-bold text-2xl'>Login</h1>
    
    <label className="label">
      <span className="label-text">Enter token</span>
    </label>
    <textarea className="textarea textarea-bordered w-full" placeholder="paste token here" value={token} onChange={ (e) => setToken(e.target.value) }></textarea>

    <div className='flex justify-center'>
      <button
        className='btn m-4 btn-primary'
        onClick={login}
        disabled={ !username }
      >
        Login
      </button>
    </div>
  </ModalFrame>
}


export default UserLoginModal