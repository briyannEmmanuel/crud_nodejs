//routes.js– Contient tous les itinéraires.

import { Router } from "express";
import { param } from "express-validator";
import Controllers from "./controllers.js";
import Validation from "./validation.js";

const router = Router({ strict: true });

router.get("/", Controllers.etudiant_list);
router.get("/create", Controllers.create_etudiant);
router.get(
  "/edit/:id",
  param("id").exists().isNumeric().toInt(),
  Validation.validate,
  Controllers.edit_etudiant
);
router.get(
  "/post/:id",
  [param("id").exists().isNumeric().toInt()],
  Controllers.single_etudiant
);
router.get(
  "/delete/:id",
  [param("id").exists().isNumeric().toInt()],
  Controllers.delete_etudiant
);

router.post(
  "/create",
  Validation.default(["nom", "prenom", "email"]),
  Validation.validate,
  Controllers.insert_etudiant
);
router.post(
  "/edit/:id",
  [
    param("id").exists().isNumeric().toInt(),
    ...Validation.default(["nom", "prenom", "email"]),
  ],
  Validation.validate,
  Controllers.update_etudiant
);

export default router;
