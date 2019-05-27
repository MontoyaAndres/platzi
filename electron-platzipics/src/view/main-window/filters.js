"use strict";

const os = require("os");
const fs = require("fs-extra");

function applyFilter(filter, currentImage) {
  let img = new Image();
  img.src = currentImage.dataset.original
    ? currentImage.dataset.original
    : currentImage.src;

  filterous
    .importImage(img, {})
    .applyInstaFilter(filter)
    .renderHtml(currentImage);
}

function saveImage(filename, callback) {
  let fileSrc = document.getElementById("image-displayed").src;

  if (fileSrc.indexOf(";base64,") !== -1) {
    fileSrc = fileSrc.replace(/^data:([A-Za-z-+/]+);base64,/, "");
    fs.writeFile(filename, fileSrc, "base64", callback);
  } else {
    fileSrc = decodeURI(fileSrc);

    if (os.platform() === "win32") {
      // This is for windows systems
      fileSrc = fileSrc.replace("file:///", "");
    } else {
      // This is for linux/mac systems
      fileSrc = fileSrc.replace("file://", "");
    }

    fs.copy(fileSrc, filename, callback);
  }
}

module.exports = {
  applyFilter,
  saveImage
};
