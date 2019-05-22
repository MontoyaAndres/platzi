"use strict";

const fs = require("fs");
const path = require("path");
const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const isImage = require("is-image");
const filesize = require("filesize");

const { setupErrors } = require("./handle-errors");

let win;

app.on("ready", function() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Platzipics",
    center: true,
    maximizable: false, // only windows and macOs,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  setupErrors(win);

  win.once("ready-to-show", function() {
    win.show();
  });

  win.on("move", function() {
    const position = win.getPosition();
    console.log(position);
  });

  win.on("closed", function() {
    win = null;
    app.quit();
  });

  win.loadURL(`file://${__dirname}/view/index.html`);
});

ipcMain.on("open-directory", function(event) {
  dialog.showOpenDialog(
    win,
    {
      title: "Seleccione la nueva ubicación",
      buttonLabel: "Abrir ubicación",
      properties: ["openDirectory"]
    },
    function(dir) {
      if (dir) {
        fs.readdir(dir[0], function(err, files) {
          if (err) throw err;

          const images = files.filter(file => isImage(file));

          const response = images.map(image => {
            const imageFile = path.join(dir[0], image);
            const size = filesize(fs.statSync(imageFile).size, { round: 0 });

            return {
              filename: image,
              src: `file://${imageFile}`,
              size
            };
          });

          event.sender.send("load-images", response);
        });
      }
    }
  );
});

ipcMain.on("open-save-dialog", function(event, ext) {
  dialog.showSaveDialog(
    win,
    {
      title: "Guardar imagen modificada",
      buttonLabel: "Guardar imagen",
      filters: [{ name: "Images", extensions: [ext.substr(1)] }]
    },
    function(file) {
      if (file) {
        event.sender.send("save-image", file);
      }
    }
  );
});

ipcMain.on("show-dialog", function(event, info) {
  dialog.showMessageBox(win, { ...info, buttons: ["Ok"] });
});

app.on("before-quit", function() {
  console.log("saliendo...");
});
