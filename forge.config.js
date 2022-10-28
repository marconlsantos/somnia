module.exports = {
  "packagerConfig": {
    "darwinDarkModeSupport": true
  },
  "makers": [
    {
      "name": "@electron-forge/maker-squirrel",
      "config": {
        "name": "somnia"
      }
    },
    {
      "name": "@electron-forge/maker-zip",
      "config": {}
    },
    {
      "name": "@electron-forge/maker-deb",
      "config": {}
    },
    {
      "name": "@electron-forge/maker-rpm",
      "config": {}
    },
    {
      "name": '@electron-forge/maker-dmg',
      "config": {}
    }
  ],
  "plugins": [
    {
      "name": "@electron-forge/plugin-webpack",
      "config": {
        "mainConfig": "./webpack.main.config.js",
        "jsonStats": true,
        "renderer": {
          "config": "./webpack.renderer.config.js",
          "jsonStats": true,
          "entryPoints": [
            {
              "html": "./src/renderer/index.html",
              "js": "./src/renderer/renderer.tsx",
              "preload": {
                js: "./src/renderer/preload.ts"
              },
              "name": "main_window"
            }
          ]
        }
      }
    }
  ]
};