// External imports
import { useState, useEffect } from 'react'

// Internal imports
import { subscribeToAlerts, unsubscribeFromAlerts } from '../lib/alerts'


interface AlertInfo {
  content: string,
  level: string,
  key: string,
}

function AlertBox(info: AlertInfo): JSX.Element {
  const level_string = {
    'error': 'alert-error',
    'info': 'alert-info',
    'warning': 'alert-warning',
  }[info.level] ?? 'alert-info'

  return <div
    className={`alert ${level_string} shadow-lg w-full max-w-[24rem] pointer-events-auto`}
    style={{
      animation: "fade-out 0.5s",
      animationDelay: `2.5s`,
      animationFillMode: "forwards"
    }}
    key={info.key}
  >
    <div>
      <span>{info.content}</span>
    </div>
  </div>
}

// Required because otherwise the variable is snapshotted for the arrow function.
let LAST_ALERTS = [] as AlertInfo[]

function AlertGroup(): JSX.Element {

  const [alerts, setAlerts] = useState([] as AlertInfo[])
  LAST_ALERTS = alerts

  function getAlerts() {
    return alerts
  }

  function createAlert(info: AlertInfo) {
    setAlerts([
      ...alerts,
      info
    ])
    // Delete the alert after a while
    setTimeout( () => {
      setAlerts(
        LAST_ALERTS.filter( a => a.key !== info.key )
      )
    }, 3000)
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
        alerts.map( a => AlertBox(a) )
      }
    </div>
  )
}

export default AlertGroup
