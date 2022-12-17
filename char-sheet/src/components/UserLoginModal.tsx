// External imports
import { useState } from 'react'
import server from '../lib/server'

// Components
import ModalFrame from './ModalFrame'

function UserLoginModal({open, setOpen, setUser, isLoggedIn}:{
    open: boolean,
    setOpen(open: boolean): void,
    setUser(user: string | null): void,
    isLoggedIn: boolean,
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

  function login(token: string | null) {
    setUser(token)
    closeModal()
  }

  return <ModalFrame open={open} close={closeModal} title={isLoggedIn ? "Confirm Logout" : "Login"}>
    {
      !isLoggedIn ? [
        <label className="label">
          <span className="label-text">Enter token</span>
        </label>,
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="paste token here"
          value={token}
          onChange={ (e) => setToken(e.target.value) }
          />
      ] : null
    }

    <div className='flex justify-center'>
      <button
        className='btn m-4 btn-primary'
        onClick={() => login(isLoggedIn ? null : token.trim())}
        disabled={ isLoggedIn ? false : !username }
      >
        {isLoggedIn ? "Logout" : "Login"}
      </button>
    </div>

  </ModalFrame>
}


export default UserLoginModal