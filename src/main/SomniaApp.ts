import { App, BrowserWindow } from "electron";
import MainWindow from "./MainWindow";

// This allows TypeScript to pick up the magic constant that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

export default class SomniaApp {
    static application: Electron.App;
    static mainWindow: MainWindow;

    private static onReady() {
        // Create the browser window.
        SomniaApp.createMainWindow();
    }

    private static createMainWindow() {
        this.mainWindow = new MainWindow({
            width: 1281,
            height: 854,
            webPreferences: {
                preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
            }
        });

        this.mainWindow.setHandlers();

        // and load the index.html of the app.
        this.mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

        // Open the DevTools.
        this.mainWindow.webContents.openDevTools();
    }

    private static onActivate() {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            SomniaApp.createMainWindow();
        }
    }

    private static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            SomniaApp.application.quit();
        }
    }

    static main(app: App) {
        SomniaApp.application = app;

        SomniaApp.application.on("ready", this.onReady);
        SomniaApp.application.on('window-all-closed', this.onWindowAllClosed);
        SomniaApp.application.on('activate', this.onActivate);

    }
}
