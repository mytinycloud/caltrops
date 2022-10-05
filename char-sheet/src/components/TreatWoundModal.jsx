import { Modal } from 'react-daisyui'

function TreatWoundModal({open, setOpen, treatWound}) {

  if (!open) {
    return []
  }

  function closeModal() {
    setOpen(false)
  }

  function onTreatWound(success) {
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