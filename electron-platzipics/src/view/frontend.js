const { setIpc, openDirectory, saveFile } = require("./ipcRendererEvents");
const {
  addImagesEvent,
  searchImagesEvent,
  selectEvent
} = require("./images-ui");

window.addEventListener("load", () => {
  setIpc();
  addImagesEvent();
  searchImagesEvent();
  selectEvent();
  buttonEvent("open-directory", openDirectory);
  buttonEvent("save-button", saveFile);
});

function buttonEvent(id, func) {
  const openDirectory = document.getElementById(id);
  openDirectory.addEventListener("click", func);
}
