const fs = require("fs");
const path = require("path");
const { ipcMain, dialog } = require("electron");
const isImage = require("is-image");
const filesize = require("filesize");

function setMainIpc(win) {
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
          loadImages(event, dir[0]);
        }
      }
    );
  });

  ipcMain.on("load-directory", function(event, dir) {
    loadImages(event, dir);
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
}

function loadImages(event, dir) {
  fs.readdir(dir, function(err, files) {
    if (err) throw err;

    const images = files.filter(file => isImage(file));

    const response = images.map(image => {
      const imageFile = path.join(dir, image);
      const size = filesize(fs.statSync(imageFile).size, { round: 0 });

      return {
        filename: image,
        src: `plp://${imageFile}`,
        size
      };
    });

    event.sender.send("load-images", dir, response);
  });
}

module.exports = setMainIpc;
