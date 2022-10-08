// External imports
import { Modal } from 'react-daisyui'

function TreatWoundModal( {open, setOpen, treatWound}: {
    open: boolean,
    setOpen(open: boolean):void,
    treatWound(success: boolean): void
  }): JSX.Element | null {

  if (!open) {
    return null
  }

  function closeModal() {
    setOpen(false)
  }

  function onTreatWound(success: boolean) {
    treatWound(success)
    closeModal()
  }

  return <Modal open={open} onClickBackdrop={closeModal}>
    <h1 className='font-bold text-2xl'>Treat wound</h1>
    
    <div className='flex gap-8 justify-center mt-4'>
      <button
        className='btn'
        onClick={ () => onTreatWound(true) }
        >
        Treat
      </button>
      <button
        className='btn'
        onClick={ () => onTreatWound(false) }
        >
        Botch
      </button>
    </div>
  </Modal>
}


export default TreatWoundModal