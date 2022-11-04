module.exports = {
  "packagerConfig": {
    "darwinDarkModeSupport": false,
    "icon": "src/assets/somnia.icns"
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
          "jsonStats": true,
          "config": "./webpack.renderer.config.js",
          "entryPoints": [
            {
              "html": "./src/renderer/index.html",
              "js": "./src/renderer/renderer.tsx",
              "preload": {
                "js": "./src/renderer/preload.ts"
              },
              "name": "main_window"
            }
          ]
        }
      }
    }
  ]
};