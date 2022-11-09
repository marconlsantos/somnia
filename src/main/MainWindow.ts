import {
    BrowserWindow,
    BrowserWindowConstructorOptions,
} from "electron";

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
}