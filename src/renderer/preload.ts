import { Dream } from '@prisma/client';
import { contextBridge, ipcRenderer } from 'electron';

console.debug("[Somnia] Exposing dreamsAPI in the MainWorld (preload script)");

contextBridge.exposeInMainWorld('dreamsAPI', {
    getDreamPage: (searchFilter: string, pageSize: number, currentPage: number) =>
        ipcRenderer.invoke('main:getDreamPage', searchFilter, pageSize, currentPage),
    getDreamPageCount: (searchFilter: string, pageSize: number) =>
        ipcRenderer.invoke('main:getDreamPageCount', searchFilter, pageSize),
    deleteDream: (dreamId: number) => ipcRenderer.invoke('main:deleteDream', dreamId),
    saveDream: (dream: Dream) => ipcRenderer.invoke('main:saveDream', dream),
    getDream: (id: number) => ipcRenderer.invoke('main:getDream', id)
});