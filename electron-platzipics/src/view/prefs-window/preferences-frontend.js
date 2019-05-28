const { remote, ipcRenderer } = require("electron");
const settings = require("electron-settings");
const bcrypt = require("bcryptjs");

window.addEventListener("load", function() {
  cancelButton();
  saveButton();

  if (settings.has("cloudup.user")) {
    document.getElementById("cloudup-user").value = settings.get(
      "cloudup.user"
    );
  }
});

function cancelButton() {
  const cancelButton = document.getElementById("cancel-button");

  cancelButton.addEventListener("click", function() {
    const prefsWindow = remote.getCurrentWindow();
    prefsWindow.close();
  });
}

function saveButton() {
  const saveButton = document.getElementById("save-button");
  const prefsForm = document.getElementById("preferences-form");

  saveButton.addEventListener("click", function() {
    if (prefsForm.reportValidity()) {
      const encrypted = bcrypt.hashSync(
        document.getElementById("cloudup-passwd").value,
        10
      );

      settings.set(
        "cloudup.user",
        document.getElementById("cloudup-user").value
      );
      settings.set("cloudup.passwd", encrypted);

      const prefsWindow = remote.getCurrentWindow();
      prefsWindow.close();
    } else {
      ipcRenderer.send("show-dialog", {
        type: "error",
        title: "Platzipics",
        message: "Por favor complete los campos requeridos"
      });
    }
  });
}
