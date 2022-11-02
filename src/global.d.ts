import { Dream } from '@prisma/client';

export interface IDreamsAPI {
    getDreamPage: (searchFilter: string, pageSize: number, currentPage: number) => Promise<Dream[]>;
    getDreamPageCount: (searchFilter: string, pageSize: number) => Promise<number>;
    deleteDream: (dreamId: number) => Promise<boolean>;
    saveDream: (dream: Dream) => Promise<boolean>;
    getDream: (id: number) => Promise<Dream>;
}

declare global {
    interface Window {
        dreamsAPI: IDreamsAPI;
    }
}
