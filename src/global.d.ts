import { Dream } from '@prisma/client';

export interface IDreamsAPI {
    getDreamPage: (pageSize: number, currentPage: number) => Promise<Dream[]>;
    getDreamPageCount: (pageSize: number) => Promise<number>;
}

declare global {
    interface Window {
        dreamsAPI: IDreamsAPI;
    }
}
