"use strict";

const fs = require("fs");

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

  fileSrc = fileSrc.replace(/^data:([A-Za-z-+/]+);base64,/, "");

  fs.writeFile(filename, fileSrc, "base64", callback);
}

module.exports = {
  applyFilter,
  saveImage
};
