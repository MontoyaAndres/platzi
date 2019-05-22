"use strict";

const path = require("path");
const { ipcRenderer } = require("electron");

const {
  clearImages,
  loadImages,
  addImagesEvent,
  selectFirstImage
} = require("./images-ui");
const { saveImage } = require("./filters");

function setIpc() {
  ipcRenderer.on("load-images", function(event, images) {
    clearImages();
    loadImages(images);
    addImagesEvent();
    selectFirstImage();
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

module.exports = {
  setIpc,
  openDirectory,
  showDialog,
  saveFile
};
