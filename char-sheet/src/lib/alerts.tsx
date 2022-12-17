type AlertLevel = 'error' | 'warning' | 'success' | 'info';

let ALERT_CALLBACK: ((text: string, level: AlertLevel) => void) | null = null;

export function subscribeToAlerts( callback: (text: string, level: AlertLevel) => void ) {
  ALERT_CALLBACK = callback;
}

export function unsubscribeFromAlerts(): void {
  ALERT_CALLBACK = null;
}

function submitAlert(content: string, level: AlertLevel = "info") {
  if (ALERT_CALLBACK) {
    ALERT_CALLBACK(content, level)
  } else {
    console.warn(`Alert fired without subscriber: ${content}`)
  }
}

export function alertError(content: string) {
  submitAlert(content, 'error')
}

export function alertWarning(content: string) {
  submitAlert(content, 'warning')
}

export function alertInfo(content: string) {
  submitAlert(content, 'info')
}

export function alertSuccess(content: string) {
  submitAlert(content, 'success')
}