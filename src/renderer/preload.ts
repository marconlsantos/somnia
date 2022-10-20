import { contextBridge, ipcRenderer } from 'electron';

console.info("[Somnia] Exposing dreamsAPI in the MainWorld (preload script)");

contextBridge.exposeInMainWorld('dreamsAPI', {
    getDreamPage: (searchFilter: string,
        pageSize: number,
        currentPage: number) => ipcRenderer.invoke('main:getDreamPage', searchFilter, pageSize, currentPage),
    getDreamPageCount: (searchFilter: string,
        pageSize: number) => ipcRenderer.invoke('main:getDreamPageCount', searchFilter, pageSize)
});