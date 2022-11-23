// External imports
import { useState } from 'react'

// Components
import ModalFrame from './ModalFrame'
import TextEntryBox from './TextEntryBox'


function UserLoginModal({open, setOpen, setUser}:{
    open: boolean,
    setOpen(open: boolean): void,
    setUser(user: string | null): void,
  }): JSX.Element | null {

  const [username, setUsername] = useState("");

  if (!open) {
    return null
  }

  function closeModal() {
    setUsername("");
    setOpen(false)
  }

  function login() {
    setUser(username)
    closeModal()
  }

  return <ModalFrame open={open} close={closeModal}>
    <h1 className='font-bold text-2xl'>New character sheet</h1>
    
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">Login</span>
      </label>
      <TextEntryBox
        value={username}
        setValue={setUsername}
        limit={48}
        inputSize='input-md'
        placeholder='enter email'
      ></TextEntryBox>
    </div>

    <div className='flex justify-center'>
      <button
        className='btn m-4 btn-primary'
        onClick={login}
        disabled={username.length === 0}
      >
        Login
      </button>
    </div>
  </ModalFrame>
}


export default UserLoginModal