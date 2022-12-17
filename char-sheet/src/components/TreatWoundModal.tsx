// External imports
import ModalFrame from './ModalFrame'

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

  return <ModalFrame open={open} close={closeModal} title="Treat wound">
    <div className='flex gap-8 justify-center mt-4'>
      <button
        className='btn btn-success'
        onClick={ () => onTreatWound(true) }
        >
        Treat
      </button>
      <button
        className='btn btn-error'
        onClick={ () => onTreatWound(false) }
        >
        Botch
      </button>
    </div>
  </ModalFrame>
}


export default TreatWoundModal