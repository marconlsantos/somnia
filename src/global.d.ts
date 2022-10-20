import { Dream } from '@prisma/client';

export interface IDreamsAPI {
    getDreamPage: (searchFilter: string, pageSize: number, currentPage: number) => Promise<Dream[]>;
    getDreamPageCount: (searchFilter: string, pageSize: number) => Promise<number>;
}

declare global {
    interface Window {
        dreamsAPI: IDreamsAPI;
    }
}
