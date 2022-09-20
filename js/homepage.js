const electron = require("electron");
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const electronRemote = process.type === 'browser'
  ? electron
  : require('@electron/remote');
const app = electron.app;
const url = require("url");

const adminWin = document.getElementById('admin')

adminWin.addEventListener('click', function(event){
    const modalPath = path.join('file://', __dirname, 'adminPage.html')
    let win = new BrowserWindow({ with: 400, height: 400})
    win.loadURL(modalPath)
    win.show()
})






let AdminWindow;

function createAdminWindow(){
    AdminWindow = new BrowserWindow(
        { 
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
    }});
    AdminWindow.loadURL(
        path.join(__dirname, 'homepage.html')
    )
    AdminWindow.on('closed', ()=> {
        winD=null;
    })
};

function createBrowserWindow() {
  const remote = require('@electron/remote');
  const BrowserWindow = remote.BrowserWindow;
  const win = new BrowserWindow({
    height: 600,
    width: 800
  });

  win.loadURL('adminpage.html');
}
function createSlideWindow(){
    const remote = require('@electron/remote');
    const BrowserWindow = remote.BrowserWindow;
    const win = new BrowserWindow({
    height: 600,
    width: 800
  });

  win.loadURL('adminpage.html');
}
function ZipcodeHelp() {
    alert("If Zipcode is missing in list at left, do: \n\n\
      1. Enter any zipcode and click Create Client. \n\
      2. Goto Zipcodes and create new zip code. \n\
      3. Edit this new client from the client list.\n\
      4. Select the new zipcode." );
  }