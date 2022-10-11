import { BrowserWindow, BrowserWindowConstructorOptions, ipcMain } from "electron";
import DreamRepository from "../Repositories/DreamRepository";

export default class MainWindow extends BrowserWindow {
    private dreamRepository: DreamRepository;

    /**
     * Creates the Somnia app main window 
     */
    constructor(options: BrowserWindowConstructorOptions) {
        super(options);

        this.dreamRepository = new DreamRepository();
    }

    setHandlers() {
        ipcMain.handle('getDreams', this.dreamRepository.getDreams);
    }
}