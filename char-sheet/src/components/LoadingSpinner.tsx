// External imports
import {
  ImSpinner2
} from 'react-icons/im'

function LoadingSpinner({size=50}:{
    size?: number,
  }): JSX.Element | null {

  return <div className='flex w-full h-full justify-center items-center p-4'>
      <ImSpinner2 size={size} className="animate-spin"/>
    </div>
}


export default LoadingSpinner;