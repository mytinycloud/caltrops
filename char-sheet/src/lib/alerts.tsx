let ALERT_CALLBACK: ((text: string, level: string) => void) | null = null;

export function subscribeToAlerts( callback: (text: string, level: string) => void ) {
  ALERT_CALLBACK = callback;
}

export function unsubscribeFromAlerts(): void {
  ALERT_CALLBACK = null;
}

function submitAlert(content: string, level: string = "info") {
  if (ALERT_CALLBACK) {
    ALERT_CALLBACK(content, level)
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