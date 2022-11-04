import { Dream } from "@prisma/client";
import {
    BrowserWindow,
    BrowserWindowConstructorOptions,
    ipcMain,
    IpcMainInvokeEvent
} from "electron";
import DreamRepository from "../Repositories/DreamRepository";

/**
 * Main window for the application
 */
export default class MainWindow extends BrowserWindow {
    /**
     * Creates the Somnia app main window 
     */
    constructor(options: BrowserWindowConstructorOptions) {
        console.debug("[Somnia] Main window construction executing");

        super(options);
    }

    private async handleGetDreamPage(event: IpcMainInvokeEvent,
        searchFilter: string,
        pageSize: number,
        currentPage: number): Promise<Dream[]> {
        const dreamRepository = new DreamRepository();

        return await dreamRepository.getPage(searchFilter, pageSize, currentPage);
    }

    private async handleGetDreamPageCount(event: IpcMainInvokeEvent,
        searchFilter: string,
        pageSize: number): Promise<number> {
        const dreamRepository = new DreamRepository();

        return await dreamRepository.getPageCount(searchFilter, pageSize);
    }

    private async handleDeleteDream(event: IpcMainInvokeEvent, dreamId: number): Promise<boolean> {
        const dreamRepository = new DreamRepository();

        return await dreamRepository.deleteDream(dreamId);
    }

    private async handleSaveDream(event: IpcMainInvokeEvent, dream: Dream): Promise<boolean> {
        const dreamRepository = new DreamRepository();

        return await dreamRepository.saveDream(dream);
    }

    private async handleGetDream(event: IpcMainInvokeEvent, id: number): Promise<Dream | null> {
        const dreamRepository = new DreamRepository();

        return await dreamRepository.getDream(id);
    }

    /**
     * Sets up all the handlers for messages sent from the main window
     */
    setHandlers() {
        console.debug("[Somnia] Setting handlers for main window");

        ipcMain.handle('main:getDreamPage', this.handleGetDreamPage);
        ipcMain.handle('main:getDreamPageCount', this.handleGetDreamPageCount);
        ipcMain.handle('main:deleteDream', this.handleDeleteDream);
        ipcMain.handle('main:saveDream', this.handleSaveDream);
        ipcMain.handle('main:getDream', this.handleGetDream);
    }
}