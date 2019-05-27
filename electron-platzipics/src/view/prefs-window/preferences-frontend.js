const { remote } = require("electron");

window.addEventListener("load", function() {
  console.log("hi");
  cancelButton();
});

function cancelButton() {
  const cancelButton = document.getElementById("cancel-button");

  cancelButton.addEventListener("click", function() {
    const prefsWindow = remote.getCurrentWindow();
    prefsWindow.close();
  });
}
