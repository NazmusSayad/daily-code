type FileExplorerOptions = {
  accept?: string
  multiple?: boolean
}

export function openFileExplorer(options: FileExplorerOptions = {}) {
  return new Promise<FileList>((resolve, reject) => {
    const input = document.createElement('input')
    input.type = 'file'

    input.accept = options.accept ?? 'image/*'
    input.multiple = options.multiple ?? false

    input.onchange = async (e) => {
      const files = (e.target as HTMLInputElement).files
      if (!files) return reject(new Error('No files selected'))
      resolve(files)
    }

    input.click()
  })
}
