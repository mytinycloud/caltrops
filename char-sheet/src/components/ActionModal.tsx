// External imports
import { Modal } from 'react-daisyui'
import { ImCross } from 'react-icons/im'

export interface ModalActionInfo {
  name: string,
  callback(): void,
  type?: "primary" | "success" | "error",
  disabled?: boolean,
  stayOpen?: boolean,
}

function ActionModal( {open, close, children, title, actions = []}: {
    open: boolean,
    close(): void,
    title: string,
    actions?: ModalActionInfo[],
    children?: React.ReactNode,
  }): JSX.Element | null {

  function getActionStyle(type?: "primary" | "success" | "error"): string {
    if (!type) {
      return ""
    }
    const keys = {
      "primary": "btn-primary",
      "success": "btn-success",
      "error": "btn-error",
    }
    return keys[type]
  }

  return <Modal open={open} onClickBackdrop={close} responsive={true}>
    <button
      className="btn btn-sm btn-ghost btn-circle absolute right-2 top-2"
      onClick={close}
      >
      <ImCross size={14}/>
    </button>

    <h1 className='font-bold text-2xl'>{title}</h1>

    { children }

    <div className='flex justify-center'>
      {
        actions.map( action =>
          <button
            key={action.name}
            className={`btn m-4 ${getActionStyle(action.type)}`}
            onClick={() => {
              action.callback()
              if (!action.stayOpen) {
                close();
              }
            }}
            disabled={action.disabled ?? false}
          >
            {action.name}
          </button>)
      }
    </div>

  </Modal>
}


export default ActionModal