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
        console.info("[Somnia] Main window construction executing");

        super(options);
    }

    private async handleGetDreamPage(event: IpcMainInvokeEvent, pageSize: number, currentPage: number): Promise<Dream[]> {
        const dreamRepository = new DreamRepository();

        return await dreamRepository.getPage(pageSize, currentPage);
    }

    private async handleGetDreamPageCount(event: IpcMainInvokeEvent, pageSize: number): Promise<number> {
        const dreamRepository = new DreamRepository();

        return await dreamRepository.getPageCount(pageSize);
    }

    /**
     * Sets up all the handlers for messages sent from the main window
     */
    setHandlers() {
        console.info("[Somnia] Setting handlers for main window");

        ipcMain.handle('main:getDreamPage', this.handleGetDreamPage);
        ipcMain.handle('main:getDreamPageCount', this.handleGetDreamPageCount);
    }
}