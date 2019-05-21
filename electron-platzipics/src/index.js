"use strict";

const { app, BrowserWindow, ipcMain } = require("electron");

app.on("ready", function() {
  let win = new BrowserWindow({
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

ipcMain.on("ping", function(event, arg) {
  console.log("received", arg);
  event.sender.send("pong", new Date());
});

app.on("before-quit", function() {
  console.log("saliendo...");
});
