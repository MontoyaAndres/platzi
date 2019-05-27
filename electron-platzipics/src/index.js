"use strict";

const { app, BrowserWindow } = require("electron");

const { setupErrors } = require("./handle-errors");
const setMainIpc = require("./ipcMainEvents");

global.win;

app.on("ready", function() {
  global.win = new BrowserWindow({
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

  setMainIpc(global.win);
  setupErrors(global.win);

  global.win.once("ready-to-show", function() {
    global.win.show();
  });

  global.win.on("move", function() {
    const position = global.win.getPosition();
    console.log(position);
  });

  global.win.on("closed", function() {
    global.win = null;
    app.quit();
  });

  global.win.loadURL(`file://${__dirname}/view/index.html`);
});

app.on("before-quit", function() {
  console.log("saliendo...");
});
