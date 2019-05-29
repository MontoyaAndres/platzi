"use strict";

const os = require("os");
const path = require("path");
const {
  app,
  BrowserWindow,
  Tray,
  globalShortcut,
  protocol
} = require("electron");

const { setupErrors } = require("./handle-errors");
const setMainIpc = require("./ipcMainEvents");

global.win;
global.tray;

app.on("ready", function() {
  protocol.registerFileProtocol(
    "plp", // protocol name
    function(request, callback) {
      const url = request.url.substr(6);

      callback({ path: path.normalize(url) });
    },
    function(err) {
      if (err) {
        throw err;
      }
    }
  );

  global.win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Platzipics",
    center: true,
    maximizable: false, // only windows and macOs,
    show: false,
    icon: path.join(__dirname, "assets", "icons", "tray-icon.png"),
    webPreferences: {
      nodeIntegration: true
    }
  });

  globalShortcut.register("CommandOrControl+Alt+p", function() {
    global.win.show();
    global.win.focus();
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

  let icon;
  if (os.platform() === "win32") {
    icon = path.join(__dirname, "assets", "icons", "tray-icon.ico");
  } else {
    icon = path.join(__dirname, "assets", "icons", "tray-icon.png");
  }

  global.tray = new Tray(icon);
  global.tray.setToolTip("Platzipics");
  global.tray.on("click", function() {
    global.win.isVisible() ? global.win.hide() : global.win.show();
  });

  global.win.loadURL(`file://${__dirname}/view/index.html`);
});

app.on("before-quit", function() {
  globalShortcut.unregisterAll();
  console.log("saliendo...");
});
