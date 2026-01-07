const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  close: () => ipcRenderer.send("close-app"),
  minimize: () => ipcRenderer.send("minimize-app")
});
