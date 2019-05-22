"use strict";

const { app, dialog } = require("electron");

function relaunchApp(win) {
  dialog.showMessageBox(
    win,
    {
      type: "error",
      title: "Platzipics",
      message: "Ocurrió un error inesperado, se reiniciará el aplicativo",
      buttons: ["Ok"]
    },
    function() {
      app.relaunch();
      app.exit(0);
    }
  );
}

function setupErrors(win) {
  win.webContents.on("crashed", function() {
    relaunchApp(win);
  });

  win.on("unresponsive", function() {
    dialog.showMessageBox(win, {
      type: "warning",
      title: "Platzipics",
      message:
        "Un proceso está tardando demasiado, puede esperar o reiniciar el aplicativo manualmente",
      buttons: ["Ok"]
    });
  });

  process.on("uncaughtException", function() {
    relaunchApp(win);
  });
}

module.exports = {
  setupErrors
};
