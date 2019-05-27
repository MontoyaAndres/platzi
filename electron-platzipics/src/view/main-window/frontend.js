const {
  setIpc,
  openDirectory,
  openPreferences,
  saveFile
} = require("./main-window/ipcRendererEvents");
const {
  addImagesEvent,
  searchImagesEvent,
  selectEvent
} = require("./main-window/images-ui");

window.addEventListener("load", () => {
  setIpc();
  addImagesEvent();
  searchImagesEvent();
  selectEvent();
  buttonEvent("open-directory", openDirectory);
  buttonEvent("open-preferences", openPreferences);
  buttonEvent("save-button", saveFile);
});

function buttonEvent(id, func) {
  const openDirectory = document.getElementById(id);
  openDirectory.addEventListener("click", func);
}
