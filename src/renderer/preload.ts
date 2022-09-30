import { contextBridge } from 'electron';
import Dream from '../domain/Dream';

function getDreams(): Dream[] {

    const dreams: Dream[] = [new Dream(new Date(), 'Title 1'), new Dream(new Date(2022, 9, 28), 'Title 2')];

    return dreams;
}

contextBridge.exposeInMainWorld('dreamsAPI', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    // we can also expose variables, not just functions
    getDreams: () => getDreams
});