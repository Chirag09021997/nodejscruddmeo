const { error } = require("console");
const con = require("../../common/db");
const path = require("path");

exports.get = (req, res) => {
  //   res.send("User Index Routes");
  res.render("users", { title: "User-List" });
};

exports.create = (req, res) => {
  //   res.send("User Create Routes");
  res.render("users/create", { title: "User-Create" });
};

exports.store = (req, res) => {
  console.log("req::", req.body);
  con.query(
    "INSERT INTO users SET ?",
    {
      name: req.body?.name,
      email: req.body?.email,
      password: req.body?.password,
    },
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/users");
      }
    }
  );
};

exports.show = (req, res) => {
  //   res.send(`User Show Page: ${req.params.id}`);
  const id = req.params.id;
  con.query("SELECT * FROM users WHERE id = ?", [id], (error, results) => {
    if (error) {
      console.log(error);
    } else {
      res.render("users/show", { title: "User-Show", users: results[0] });
    }
  });
};

exports.edit = (req, res) => {
  //   res.send(`User Edit Page: ${req.params.id}`);
  // res.render("users/edit", { title: "User-Edit" });
  const id = req.params.id;
  con.query("SELECT * FROM users WHERE id = ?", [id], (error, results) => {
    if (error) {
      console.log(error);
    } else {
      res.render("users/edit", { title: "User-Edit", users: results[0] });
    }
  });
};

exports.update = (req, res) => {
  con.query(
    "UPDATE users SET ? WHERE id = ?",
    [
      {
        name: req.body?.name,
        email: req.body?.email,
        password: req.body?.password,
      },
      req.params.id,
    ],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/users");
      }
    }
  );
  // res.send(`User Update Page: ${req.params.id}`);
};

exports.delete = (req, res) => {
  const id = req.params.id;
  console.log("delete users:", id);
  con.query("DELETE FROM users WHERE id = ?", [id], (error, results) => {
    if (error) {
      throw error;
    } else {
      data = JSON.stringify({ success: true });
      res.send({ success: true });
    }
  });
  // res.send(`User Delete Page: ${req.params.id}`);
};

exports.getData = (req, res) => {
  con.query("SELECT * FROM users", (error, results) => {
    if (error) {
      throw error;
    } else {
      data = JSON.stringify(results);
      res.send(data);
    }
  });
};
