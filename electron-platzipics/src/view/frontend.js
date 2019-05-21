const url = require("url");
const path = require("path");

const applyFilter = require("./filters");
const { setIpc, sendIpc } = require("./ipcRendererEvents");

window.addEventListener("load", () => {
  setIpc();
  addImagesEvent();
  searchImagesEvent();
  selectEvent();
  openDirectory();
});

function openDirectory() {
  const openDirectory = document.getElementById("open-directory");
  openDirectory.addEventListener("click", function() {
    sendIpc();
  });
}

function addImagesEvent() {
  const thumbs = document.querySelectorAll("li.list-group-item");

  for (let i = 0; i < thumbs.length; i++) {
    thumbs[i].addEventListener("click", function() {
      changeImage(this);
    });
  }
}

function selectEvent() {
  const select = document.getElementById("filters");

  select.addEventListener("change", function() {
    applyFilter(this.value, document.getElementById("image-displayed"));
  });
}

function changeImage(node) {
  if (node) {
    document.querySelector("li.selected").classList.remove("selected");

    node.classList.add("selected");

    document.getElementById("image-displayed").src = node.querySelector(
      "img"
    ).src;
  } else {
    document.getElementById("image-displayed").src = "";
  }
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
      showAllImages();
    }
  });
}

function showAllImages() {
  const thumbs = document.querySelectorAll("li.hidden");

  for (let i = 0; i < thumbs.length; i++) {
    thumbs[i].classList.remove("hidden");
  }
}

function selectFirstImage() {
  const image = document.querySelector("li.list-group-item:not(.hidden)");

  changeImage(image);
}
