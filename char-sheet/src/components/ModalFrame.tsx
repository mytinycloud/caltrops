// External imports
import { Modal } from 'react-daisyui'
import { ImCross } from 'react-icons/im'

function ModalFrame( {open, close, children}: {
    open: boolean,
    close(): void,
    children?: React.ReactNode,
  }): JSX.Element | null {

  return <Modal open={open} onClickBackdrop={close}>
    <button
      className="btn btn-sm btn-ghost btn-circle absolute right-2 top-2"
      onClick={close}
      >
      <ImCross size={14}/>
    </button>

    { children }
  </Modal>
}


export default ModalFrame