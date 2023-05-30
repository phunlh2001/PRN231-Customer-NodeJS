import express from "express";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";

import router from "./controllers/customer.route.js";

const app = express();
const PORT = 3000;

// setup before start
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// setup static direction
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "public")));

// set engine
app.engine("hbs", engine({ extname: "hbs" }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// routers
app.get("/", (req, res) => {
  res.render("home/index");
});

app.use("/customers", router);

app.listen(PORT, () =>
  console.log(`Client started on http://localhost:${PORT}`)
);
