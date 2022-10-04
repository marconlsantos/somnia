import Dream from 'src/domain/Dream';

export interface IDreamsAPI {
    getDreams: () => Dream[];
}

declare global {
    interface Window {
        dreamsAPI: IDreamsAPI;
    }
}