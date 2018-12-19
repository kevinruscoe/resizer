const { app, ipcMain, BrowserWindow } = require('electron')
const fs = require('fs')
const sharp = require('sharp')
const path = require('path')
const dir = path.join(require('os').homedir(), 'Desktop');

let window

ipcMain.on('process-file', (event, args) => {

    let source = args.path
    let ext = path.extname(source)
    let basename = path.basename(source, ext)

    let width = args.width
    let height = args.height

    let exportType = args.exportType

    let output = `${dir}/${basename}-exported-${width}x${height}.${exportType}`

    sharp(source)
        .resize({
            width: width,
            height: height,
            fit: 'inside',
        })
        .toFile(output)

})

app.on('ready', () => {
    window = new BrowserWindow({
        width: 300,
        height: 600
    })

    window.loadFile('index.html')

    // window.webContents.openDevTools()

    window.on('closed', () => {
        app.quit()
    })
})