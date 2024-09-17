/**
 * The preload script runs before `index.html` is loaded
 * in the renderer. It has access to web APIs as well as
 * Electron's renderer process modules and some polyfilled
 * Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */


function preinit() {

}

window.addEventListener( 'DOMContentLoaded', preinit );

/* 
  This creates a global symbol for the Electon APIs that we will expose.
  This is called IPC Bridging. IPC is Interprocess Communications.
  Essentially, we want the renderer process to have access to the main
  process, which imports all of the Node and Electron Modules.
*/

/*
contextBridge.exposeInMainWorld( 'electronAPI', {
  showSaveDialog: ( options ) => ipcRenderer.invoke( 'show-save-dialog', options )
} );
*/


