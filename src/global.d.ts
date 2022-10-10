import { Dream } from '@prisma/client';

export interface IDreamsAPI {
    getDreams: () => Promise<Dream[]>;
}

declare global {
    interface Window {
        dreamsAPI: IDreamsAPI;
    }
}