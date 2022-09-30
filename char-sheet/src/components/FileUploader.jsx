
function FileUploader({setFile, children}) {

  async function onDrop(e) {
    e.preventDefault()

    let files = []

    if (e.dataTransfer.items) {
      files = [...e.dataTransfer.items]
        .filter(f => f.kind === 'file')
        .map( f => f.getAsFile())
    } else {
      files = [...e.dataTransfer.files]
    }

    files.filter( f => f.name.toLowerCase().endsWith('.json'))

    if (files.length === 1) {
      const file = files[0]
      let content = JSON.parse(await file.text())
      setFile(content)
    }
  }

  return (
    <div
      onDrop={onDrop}
      onDragOver={e => e.preventDefault()}
      >
        {children}
    </div>
  )
}

export default FileUploader