const db = require("../../models");
const Users = db.users;
const { methods: commonService } = require("../../services/index");

exports.get = async (req, res) => {
  res.render("users", { title: "User-List" });
};

exports.create = async (req, res) => {
  res.render("users/create", { title: "User-Create" });
};

exports.store = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  if (!name) {
    res.status(400).render("users/create", {
      title: "User-Create",
      error: "User name can not be empty!",
    });
    return;
  }
  const hashPassword = await commonService.generateHashPassword(password, 8);

  let obj = {
    name: name,
    email: email,
    password: hashPassword,
  };

  try {
    const data = await commonService.create(Users, obj);
    if (data) {
      res.redirect("/users");
    } else {
      res.status(404).send({
        message: `Cannot Store User Data`,
      });
    }
  } catch (error) {
    console.error("Error store item: ", error);
    res.status(500).render("error", { error: "Internal Server Error" });
  }
};

exports.show = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.redirect("users");
    return;
  }
  let query = {
    where: { id: id },
    attributes: ["id", "name", "email", "status"],
  };
  try {
    const data = await commonService.get(Users, query);
    console.log("user edit::", data);

    if (data) {
      res.render("users/show", { title: "User-Show", users: data });
    } else {
      res.status(404).send({
        message: `Cannot find User with id=${id}.`,
      });
    }
  } catch (error) {
    console.error("Error show user: ", error);
    res.status(500).render("error", { error: "Internal Server Error" });
  }
};

exports.edit = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.redirect("users");
    return;
  }
  let query = {
    where: { id: id },
    attributes: ["id", "name", "email", "status"],
  };
  try {
    const data = await commonService.get(Users, query);
    console.log("user edit::", data);
    if (data) {
      res.render("users/edit", { title: "User-Edit", users: data });
    } else {
      res.status(404).send({
        message: `Cannot find Users with id=${id}.`,
      });
    }
  } catch (error) {
    console.error("Error show Users: ", error);
    res.status(500).render("error", { error: "Internal Server Error" });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const dataCheck = await commonService.get(Users, { where: { id: id } });
  if (!dataCheck) {
    res.status(404).send({
      message: `Cannot find User with id=${id}.`,
    });
  }
  // const hashPassword = await commonService.generateHashPassword(password, 8);

  let obj = {
    name: req.body.name,
    email: req.body.email,
    status: req.body.status,
    // password: hashPassword,
  };

  try {
    const data = await commonService.update(Users, { where: { id: id } }, obj);
    if (data) {
      res.redirect("/users");
    } else {
      res.status(404).send({
        message: `Cannot Update User Data`,
      });
    }
  } catch (err) {
    console.error("Error getAllData user: ", err);
    res.status(500).render("error", { error: "Internal Server Error" });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  const dataCheck = await commonService.get(Users, { where: { id: id } });
  if (!dataCheck) {
    res.status(404).send({
      success: false,
      message: `Cannot find User with id=${id}.`,
    });
    return;
  }
  try {
    const data = await commonService.delete(Users, { where: { id: id } });
    if (data) {
      res.send({ success: true, message: `User Deleted SuccessFully!` });
    } else {
      res.status(404).send({
        success: false,
        message: `Cannot Delete User Data`,
      });
    }
  } catch (err) {
    console.error("Error getAllData user: ", err);
    res.status(500).render("error", { error: "Internal Server Error" });
  }
};

exports.getData = async (req, res) => {
  let query = {
    attributes: ["id", "name", "email", "status"],
  };
  try {
    const data = await commonService.getAll(Users, query);
    if (data) {
      res.send(JSON.stringify(data));
    } else {
      res.status(404).send({
        message: `Cannot Users All Record Get`,
      });
    }
  } catch (error) {
    console.error("Error getAllData users: ", error);
    res.status(500).render("error", { error: "Internal Server Error" });
  }
};
