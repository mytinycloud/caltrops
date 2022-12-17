// External imports
import { useState } from 'react'
import server from '../lib/server'

// Components
import ActionModal from './ActionModal'

function UserLoginModal({open, close, setUser, isLoggedIn}:{
    open: boolean,
    close(): void,
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
    close()
  }

  if (isLoggedIn) {
    return <ActionModal
      title="Confirm logout"
      open={open}
      close={closeModal}
      actions={[
        {
          name: "Logout",
          callback: () => setUser(null),
          type: "error",
        }
      ]}
    />
  }
  else {
    return <ActionModal
      title="Login"
      open={open}
      close={closeModal}
      actions={[
        {
          name: "Login",
          callback: () => setUser(token.trim()),
          type: "primary",
          disabled: !username,
        }
      ]}
    >

    <label className="label">
      <span className="label-text">Enter token</span>
    </label>
    <textarea
      className="textarea textarea-bordered w-full"
      placeholder="paste token here"
      value={token}
      onChange={ (e) => setToken(e.target.value) }
      />

    </ActionModal>
  }
}


export default UserLoginModal