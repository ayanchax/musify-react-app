require("ignore-styles");

require("@babel/register")({
    ignore: [/(node_modules)/],
    presets: ["@babel/preset-env", "react-app"],
});

require("./index");