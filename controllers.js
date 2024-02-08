//controllers.js– Contient une classe Controller qui contient toutes les
//routes callbacks sous forme de méthodes statiques .

import DB from "./database.js";

class Controllers {
  static create_etudiant = (req, res) => {
    res.render("create-etudiant");
  };

  static etudiant_list = async (req, res, next) => {
    try {
      const [row] = await DB.query("SELECT * FROM `etudiants`");
      res.render("list-etudiant", {
        etudiants: row,
      });
    } catch (e) {
      next(e);
    }
  };

  static insert_etudiant = async (req, res, next) => {
    if (res.locals.validationError !== undefined) {
      return res.render("create-etudiant", {
        validationErrors: JSON.stringify(res.locals.validationError.errors),
        body: req.body,
      });
    }
    const { nom, prenom, email } = req.body;
    try {
      await DB.execute(
        "INSERT INTO `etudiants` (`nom`,`prenom`,`email`) VALUES (?,?,?)",
        [nom, prenom, email]
      );
      res.redirect("/");
    } catch (e) {
      next(e);
    }
  };

  static edit_etudiant = async (req, res, next) => {
    if (res.locals.validationError !== undefined) {
      return res.redirect("/");
    }
    try {
      const [row] = await DB.query("SELECT * FROM `etudiants` WHERE `id`=?", [
        req.params.id,
      ]);
      if (Object.keys(row).length === 0) {
        return res.redirect("/");
      }
      res.render("edit-etudiant", {
        etudiant: Object.values(row)[0],
      });
    } catch (e) {
      next(e);
    }
  };

  static update_etudiant = async (req, res, next) => {
    if (isNaN(+req.params.id)) {
      return res.redirect("/");
    }
    try {
      const [row] = await DB.execute("SELECT * FROM `etudiants` WHERE `id`=?", [
        req.params.id,
      ]);
      if (Object.keys(row).length === 0) {
        return res.redirect("/");
      }
      if (res.locals.validationError !== undefined) {
        return res.render("edit-etudiant", {
          validationErrors: JSON.stringify(res.locals.validationError.errors),
          body: req.body,
          etudiant: Object.values(row)[0],
        });
      }
      const date = new Date().toISOString();
      const { nom, prenom, email } = req.body;
      await DB.execute(
        "UPDATE `etudiants` SET `nom`=?, `prenom`=?,`email`=?, `updated_at`=? WHERE `id`=?",
        [nom, prenom, email, date, req.params.id]
      );
      res.render("edit-etudiant", {
        body: req.body,
        updated: 1,
      });
    } catch (e) {
      next(e);
    }
  };

  static delete_etudiant = async (req, res, next) => {
    if (isNaN(+req.params.id)) {
      return res.redirect("/");
    }
    await DB.execute("DELETE FROM `etudiants` WHERE `id`=?", [req.params.id]);
    return res.redirect("/");
  };

  static single_etudiant = async (req, res, next) => {
    if (isNaN(+req.params.id)) {
      return res.redirect("/");
    }
    try {
      const [row] = await DB.query("SELECT * FROM `etudiants` WHERE `id`=?", [
        req.params.id,
      ]);
      if (Object.keys(row).length === 0) {
        return res.redirect("/");
      }
      res.render("view", {
        etudiant: Object.values(row)[0],
      });
    } catch (e) {
      next(e);
    }
  };
}

export default Controllers;
