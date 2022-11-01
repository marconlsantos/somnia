module.exports = {
    presets: [
        ["solid", {
            "generate": "dom",
            "hydratable": true
        }],
        ["@babel/preset-env", {
            "useBuiltIns": false,
            "debug": true,
            "targets": "Chrome >= 106"
        }],
        "@babel/preset-typescript",
    ]
};