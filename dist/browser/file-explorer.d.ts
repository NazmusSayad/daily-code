/**
 * Options for the file explorer dialog.
 */
type FileExplorerOptions = {
    accept?: string;
    multiple?: boolean;
};
/**
 * Opens a file picker dialog and returns the selected files.
 * @param options Options for accepted file types and multiple selection
 * @returns A promise that resolves to the selected FileList
 * @throws {Error} If no files are selected
 */
export declare function openFileExplorer(options?: FileExplorerOptions): Promise<FileList>;
export {};
