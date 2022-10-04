import { contextBridge } from 'electron';
import Dream from '../domain/Dream';

function getDreams(): Dream[] {

    const dreams: Dream[] = [new Dream(new Date(), 'Title 1'), new Dream(new Date(2022, 9, 28), 'Title 2')];

    return dreams;
}

contextBridge.exposeInMainWorld('dreamsAPI', {
    getDreams: () => getDreams
});