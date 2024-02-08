//index.jsà partir duquel l'application commencera son exécution .
import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import routes from "./routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);
app.use((err, req, res, next) => {
  console.log(err.message);
  res.send("Error. See console");
});

app.listen(3000, () => console.log("Server is running on port: 3000"));
