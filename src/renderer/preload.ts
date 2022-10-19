import { contextBridge, ipcRenderer } from 'electron';

console.info("[Somnia] Exposing dreamsAPI in the MainWorld (preload script)");

contextBridge.exposeInMainWorld('dreamsAPI', {
    getDreamPage: (pageSize: number, currentPage: number) => ipcRenderer.invoke('main:getDreamPage', pageSize, currentPage),
    getDreamPageCount: (pageSize: number) => ipcRenderer.invoke('main:getDreamPageCount', pageSize)
});