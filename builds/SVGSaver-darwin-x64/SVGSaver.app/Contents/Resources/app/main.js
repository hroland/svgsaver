const {app, BrowserWindow} = require('electron');

let mainWindow;

app.on('window-all-closed', function() {
    app.quit();
});

app.on('ready', function() {
    mainWindow = new BrowserWindow({'width': 700, 'height': 500, 'min-width': 472, 'min-height': 304});

    mainWindow.loadURL('file://' + __dirname + '/app/app.html');
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function() {
        mainWindow = null;
    });

    mainWindow.webContents.on('new-window', function(e, url) {
        e.preventDefault();
        require('electron').shell.openExternal(url);
    });
});
