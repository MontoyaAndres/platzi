"use strict";

const { app, BrowserWindow } = require("electron");

app.on("ready", function() {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Platzipics",
    center: true,
    maximizable: false, // only windows and macOs,
    show: false
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

app.on("before-quit", function() {
  console.log("saliendo...");
});
