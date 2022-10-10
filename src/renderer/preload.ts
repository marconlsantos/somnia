import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('dreamsAPI', {
    getDreams: () => ipcRenderer.invoke('getDreams')
});