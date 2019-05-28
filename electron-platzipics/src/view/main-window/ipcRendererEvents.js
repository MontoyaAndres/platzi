"use strict";

const path = require("path");
const os = require("os");
const { ipcRenderer, remote, clipboard } = require("electron");
const settings = require("electron-settings");

const {
  clearImages,
  loadImages,
  addImagesEvent,
  selectFirstImage
} = require("./images-ui");
const { saveImage } = require("./filters");

function setIpc() {
  if (settings.has("directory")) {
    ipcRenderer.send("load-directory", settings.get("directory"));
  }

  ipcRenderer.on("load-images", function(event, dir, images) {
    clearImages();
    loadImages(images);
    addImagesEvent();
    selectFirstImage();
    settings.set("directory", dir);
    document.getElementById("directory").innerHTML = dir;
  });

  ipcRenderer.on("save-image", function(event, file) {
    saveImage(file, function(err) {
      if (err) {
        return showDialog("error", "Platzipics", err.message);
      }

      showDialog("info", "Platzipics", "La imagen fue guardada");
    });
  });
}

function openPreferences() {
  const BrowserWindows = remote.BrowserWindow;
  const mainWindow = remote.getGlobal("win");

  const preferencesWindow = new BrowserWindows({
    width: 400,
    height: 300,
    title: "Preferencias",
    center: true,
    modal: true,
    show: false,
    frame: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  if (os.platform() !== "win32") {
    preferencesWindow.setParentWindow(mainWindow);
  }

  preferencesWindow.once("ready-to-show", function() {
    preferencesWindow.show();
    preferencesWindow.focus();
  });
  preferencesWindow.loadURL(
    `file://${path.join(__dirname, "..")}/preferences.html`
  );
}

function openDirectory() {
  ipcRenderer.send("open-directory");
}

function showDialog(type, title, message) {
  ipcRenderer.send("show-dialog", {
    type,
    title,
    message
  });
}

function saveFile() {
  const image = document.getElementById("image-displayed").dataset.original;
  const ext = path.extname(image);

  ipcRenderer.send("open-save-dialog", ext);
}

function uploadImage() {
  // cloudup does not exist :(
  // https://platzi.com/clases/1124-electron/8011-subir-una-imagen/
}

function pasteImage() {
  const image = clipboard.readImage();
  const data = image.toDataURL(); // return base64 image

  if (data.indexOf("data:image/png;base64") !== -1 && !image.isEmpty()) {
    let mainImage = document.getElementById("image-displayed");
    mainImage.src = data;
    mainImage.dataset.original = data;
  } else {
    showDialog(
      "error",
      "Platzipics",
      "No hay una imagen valida en el portapapeles"
    );
  }
}

module.exports = {
  setIpc,
  openDirectory,
  showDialog,
  openPreferences,
  saveFile,
  pasteImage
};
