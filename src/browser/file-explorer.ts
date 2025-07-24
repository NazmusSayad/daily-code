/**
 * Options for the file explorer dialog.
 */
type FileExplorerOptions = {
  accept?: string
  multiple?: boolean
}

/**
 * Opens a file picker dialog and returns the selected files.
 * @param options Options for accepted file types and multiple selection
 * @returns A promise that resolves to the selected FileList
 * @throws {Error} If no files are selected
 */
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
