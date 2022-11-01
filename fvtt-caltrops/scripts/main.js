const CALTROPS_URI = "https://caltrops.tlembedded.com"

function caltrops_launch() {
  window.open(CALTROPS_URI)
}

function caltrops_recieve(data) {
  console.warn(data)
}

Hooks.once('ready', () => {
  // Adds the message handler
  window.addEventListener("message", (event) => {
    if (event.origin == CALTROPS_URI) {
      caltrops_recieve(event.data)
    }
  }, false);
})

Hooks.on('renderSidebarTab', (tab, html) => {
  // Injects the caltrops button into the chat sidebar
  if (tab.tabName == "chat") {
    let button = $('<a class="chat-control-icon"><i class="fas fa-triangle"></i></a>')
    button.on('click', caltrops_launch)
    html.find('div#chat-controls').append(button)
  }
})
