let ALERT_CALLBACK: ((text: string, level: string) => void) | null = null;

export function subscribeToAlerts( callback: (text: string, level: string) => void ) {
  ALERT_CALLBACK = callback;
}

export function unsubscribeFromAlerts(): void {
  ALERT_CALLBACK = null;
}

export function submitAlert(content: string, level: string = "info") {
  if (ALERT_CALLBACK) {
    ALERT_CALLBACK(content, level)
  }
}