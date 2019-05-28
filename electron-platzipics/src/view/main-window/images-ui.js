"use strict";

const url = require("url");
const path = require("path");

const { applyFilter } = require("./filters");

function addImagesEvent() {
  const thumbs = document.querySelectorAll("li.list-group-item");

  for (let i = 0; i < thumbs.length; i++) {
    thumbs[i].addEventListener("click", function() {
      changeImage(this);
    });
  }
}

function changeImage(node) {
  if (node) {
    const selected = document.querySelector("li.selected");

    if (selected) {
      selected.classList.remove("selected");
    }

    node.classList.add("selected");
    const image = document.getElementById("image-displayed");
    image.src = node.querySelector("img").src;
    image.dataset.original = image.src;
    document.getElementById("filters").selectedIndex = 0;
  } else {
    document.getElementById("image-displayed").src = "";
  }
}

function selectFirstImage() {
  const image = document.querySelector("li.list-group-item:not(.hidden)");

  changeImage(image);
}

function selectEvent() {
  const select = document.getElementById("filters");

  select.addEventListener("change", function() {
    applyFilter(this.value, document.getElementById("image-displayed"));
  });
}

function searchImagesEvent() {
  const searchBox = document.getElementById("search-box");

  searchBox.addEventListener("keyup", function() {
    const regex = new RegExp(this.value.toLowerCase(), "gi");

    if (this.value.length > 0) {
      const thumbs = document.querySelectorAll("li.list-group-item img");

      for (let i = 0; i < thumbs.length; i++) {
        const findUrl = url.parse(thumbs[i].src);
        const fileName = path.basename(findUrl.pathname);

        if (fileName.match(regex)) {
          thumbs[i].parentNode.classList.remove("hidden");
        } else {
          thumbs[i].parentNode.classList.add("hidden");
        }
      }

      selectFirstImage();
    } else {
      const thumbs = document.querySelectorAll("li.hidden");

      for (let i = 0; i < thumbs.length; i++) {
        thumbs[i].classList.remove("hidden");
      }
    }
  });
}

function loadImages(images) {
  const imagesList = document.querySelector("ul.list-group");

  images.forEach(({ src, filename, size }) => {
    const node = `
    <li class="list-group-item">
      <img
        class="media-object pull-left"
        src="${src}"
        height="32"
      />
      <div class="media-body">
        <strong>${filename}</strong>
        <p>${size}</p>
      </div>
    </li>
    `;

    imagesList.insertAdjacentHTML("beforeend", node);
  });
}

function clearImages() {
  const oldImages = document.querySelectorAll("li.list-group-item");

  oldImages.forEach(function(image) {
    image.parentNode.removeChild(image);
  });
}

function print() {
  window.print();
}

module.exports = {
  addImagesEvent,
  changeImage,
  selectFirstImage,
  selectEvent,
  searchImagesEvent,
  loadImages,
  clearImages,
  print
};
