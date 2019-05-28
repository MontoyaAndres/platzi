const {
  setIpc,
  openDirectory,
  openPreferences,
  saveFile,
  pasteImage
} = require("./main-window/ipcRendererEvents");
const {
  addImagesEvent,
  searchImagesEvent,
  selectEvent,
  print
} = require("./main-window/images-ui");

window.addEventListener("load", () => {
  setIpc();
  addImagesEvent();
  searchImagesEvent();
  selectEvent();
  buttonEvent("open-directory", openDirectory);
  buttonEvent("open-preferences", openPreferences);
  buttonEvent("save-button", saveFile);
  buttonEvent("print-button", print);
  buttonEvent("paste-button", pasteImage);
});

function buttonEvent(id, func) {
  const openDirectory = document.getElementById(id);
  openDirectory.addEventListener("click", func);
}
