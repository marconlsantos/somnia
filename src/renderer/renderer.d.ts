import Dream from 'src/domain/Dream';

export interface IDreamsAPI {
    node: () => string,
    chrome: () => string,
    electron: () => string,
    getDreams: () => Dream[];
}

declare global {
    interface Window {
        dreamsAPI: IDreamsAPI;
    }
}