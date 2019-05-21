"use strict";

function applyFilter(filter, currentImage) {
  let img = new Image();
  img.src = currentImage.src;

  filterous
    .importImage(img, {})
    .applyInstaFilter(filter)
    .renderHtml(currentImage);
}

module.exports = applyFilter;
