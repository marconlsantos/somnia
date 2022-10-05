import { IDreamsAPI } from './domain/IDreamsAPI.ts';

declare global {
    interface Window {
        dreamsAPI: IDreamsAPI;
    }
}