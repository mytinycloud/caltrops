// External imports
import { Modal } from 'react-daisyui'
import { ImCross } from 'react-icons/im'

function ModalFrame( {open, close, children, title}: {
    open: boolean,
    close(): void,
    children?: React.ReactNode,
    title: string
  }): JSX.Element | null {

  return <Modal open={open} onClickBackdrop={close}>
    <button
      className="btn btn-sm btn-ghost btn-circle absolute right-2 top-2"
      onClick={close}
      >
      <ImCross size={14}/>
    </button>

    <h1 className='font-bold text-2xl'>{title}</h1>

    { children }
  </Modal>
}


export default ModalFrame