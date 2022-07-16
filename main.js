console.log('main pro working');
console.log('from main.js');

const { protocol } = require("@electron/remote/main");
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

let homeWindow;
//let adminWindow;

function createWindow(){
    //adminWindow=null;
    homeWindow = new BrowserWindow(
        { 
            webPreferences: 
            {
                enableRemoteModule: true,
                nodeIntegration: true,
                contextIsolation: false,
                // nodeIntegration: false,
    }});
    homeWindow.setMenuBarVisibility(false) //hides menu
    homeWindow.loadURL(
        path.join(__dirname, 'homepage.html')
    )
    homeWindow.on('closed', ()=> {
        homeWindow=null;
    })
}

app.on('ready', createWindow);
app.on('window-all-closed', ()=>{
    if(process.platform !== 'darwin'){
        app.quit()
    }
});

app.on('activate', ()=>{
    if(homeWindow===null){
        createWindow()
    }
});