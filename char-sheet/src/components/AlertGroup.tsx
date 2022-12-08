// External imports
import { useState, useEffect } from 'react'
import { ImNotification, ImCancelCircle, ImWarning } from 'react-icons/im'
import { FaRegCheckCircle } from 'react-icons/fa'

// Internal imports
import { subscribeToAlerts, unsubscribeFromAlerts } from '../lib/alerts'

const ALERT_DURATION = 4.0

interface AlertInfo {
  content: string,
  level: string,
  key: string,
}

function AlertBox(info: AlertInfo, deleteAlert: (info: AlertInfo) => void): JSX.Element {
  const level_string = {
    'error': 'alert-error',
    'info': 'alert-info',
    'warning': 'alert-warning',
    'success': 'alert-success',
  }[info.level] ?? 'alert-info'

  const IconClass: any = {
    'error': ImCancelCircle,
    'info': ImNotification,
    'warning': ImWarning,
    'success': FaRegCheckCircle,
  }[info.level] ?? ImNotification

  return <div
    className={`alert ${level_string} shadow-lg w-full max-w-[24rem] pointer-events-auto`}
    style={{
      animation: "fade-out 0.5s",
      animationDelay: `${ALERT_DURATION - 0.5}s`,
      animationFillMode: "forwards"
    }}
    key={info.key}
    onClick={() => deleteAlert(info)}
  >
    <div className='flex w-full'>
      <span className='mr-2'><IconClass size={22}></IconClass></span>
      <span>{info.content}</span>
    </div>
  </div>
}

// Required because otherwise the variable is snapshotted for the arrow function.
let LAST_ALERTS = [] as AlertInfo[]

function AlertGroup(): JSX.Element {

  const [alerts, setAlerts] = useState([] as AlertInfo[])
  LAST_ALERTS = alerts

  function createAlert(info: AlertInfo) {
    setAlerts([
      ...alerts,
      info
    ])
    // Delete the alert after a while
    setTimeout( () => {
      deleteAlert(info)
    }, ALERT_DURATION * 1000)
  }

  function deleteAlert(info: AlertInfo) {
    setAlerts(
      LAST_ALERTS.filter( a => a.key !== info.key )
    )
  }
  
  useEffect(() => {
    subscribeToAlerts( (content, level) => createAlert({
      content: content,
      level: level,
      key: new Date().toISOString()
    }))
    return () => unsubscribeFromAlerts()
  })
  
  return (
    <div className="flex flex-col gap-2 p-8 h-full w-full fixed bottom-0 left-0 z-10 justify-end items-center md:items-start pointer-events-none">
      {
        alerts.map( a => AlertBox(a, deleteAlert) )
      }
    </div>
  )
}

export default AlertGroup
