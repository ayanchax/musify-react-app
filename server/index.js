import express from "express";

// we'll talk about this in a minute:
import serverRenderer from "./middleware/renderer";

const bodyparser = require("body-parser");
const cors = require("cors");
const path = require("path");
const PORT = 7000;

// initialize the application and create the routes
const app = express();
const router = express.Router();
//1 add middleware setup
app.use(cors());
app.use(bodyparser.json());

// root (/) should always serve our server rendered page
router.use("^/$", serverRenderer);

// other static resources should just be served as they are
router.use(
    express.static(path.resolve(__dirname, "..", "build"), { maxAge: "30d" })
);

// tell the app to use the above rules
app.use(router);

app.listen(PORT, (error) => {
    console.log("Server started at port: " + PORT);
});