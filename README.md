# Daily Todo

Small always-on-top Electron app for jotting daily tasks. Tasks are persisted in `localStorage`; each new day clears only checkboxes so your list remains but resets completion state.

## Features
- Frameless window with custom close/minimize buttons.
- Add todos via the input + Enter; click or check to toggle completion.
- Trash icon removes a task.
- Remembers tasks across restarts; resets completion state on a new calendar day.

## Quick Start
1) Install dependencies
	```bash
	npm install
	```
2) Run the app
	```bash
	npm start
	```

## Build
Electron Builder targets are configured in `package.json`. To produce a build:
```bash
npm run build
```

## Project Structure
- [main.js](main.js): Creates the frameless window and wires IPC for close/minimize.
- [preload.js](preload.js): Exposes limited IPC helpers (`close`, `minimize`) to the renderer.
- [index.html](index.html): Minimal UI shell.
- [renderer.js](renderer.js): Todo logic, rendering, daily reset, localStorage persistence, window control hooks.
- [style.css](style.css): Styles for the compact list layout and draggable title bar.

## Notes
- Auto-start at login is enabled via `app.setLoginItemSettings({ openAtLogin: true })` in [main.js](main.js).
- Builds default to a Windows portable target; adjust `build.win.target` in `package.json` as needed.
