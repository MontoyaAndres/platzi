const { remote } = require("electron");
const {
  openDirectory,
  saveFile,
  openPreferences,
  pasteImage
} = require("./ipcRendererEvents");
const { print } = require("./images-ui");

function createMenu() {
  const template = [
    {
      label: "Archivo",
      submenu: [
        {
          label: "Abrir ubicación",
          accelerator: "CmdOrCtrl+O",
          click() {
            openDirectory();
          }
        },
        {
          label: "Guardar",
          accelerator: "CmdOrCtrl+G",
          click() {
            saveFile();
          }
        },
        {
          label: "Preferencias",
          accelerator: "CmdOrCtrl+,",
          click() {
            openPreferences();
          }
        },
        {
          label: "Cerrar",
          role: "quit"
        }
      ]
    },
    {
      label: "Edición",
      submenu: [
        {
          label: "Imprimir",
          accelerator: "CmdOrCtrl+P",
          click() {
            print();
          }
        },
        {
          label: "Subir a CloudUp",
          accelerator: "CmdOrCtrl+U",
          click() {
            // This function does not exist :/
            // https://platzi.com/clases/1124-electron/8014-agregando-un-menu/
          }
        },
        {
          label: "Pegar imagen",
          accelerator: "CmdOrCtrl+V",
          click() {
            pasteImage();
          }
        }
      ]
    }
  ];
  const menu = remote.Menu.buildFromTemplate(template);

  remote.Menu.setApplicationMenu(menu);
}

module.exports = createMenu;
