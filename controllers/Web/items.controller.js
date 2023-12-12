const db = require("../../models");
const Items = db.items;
const { methods: commonService } = require("../../services/index");

exports.get = async (req, res) => {
  res.render("items", { title: "Item-List" });
};

exports.create = async (req, res) => {
  res.render("items/create", { title: "Item-Create" });
};

exports.store = async (req, res) => {
  const name = req.body.name;
  if (!name) {
    res.status(400).render("items/create", {
      title: "Item-Create",
      error: "Item name can not be empty!",
    });
    return;
  }
  let obj = {
    name: name,
  };
  try {
    const data = await commonService.create(Items, obj);
    if (data) {
      res.redirect("/items");
    } else {
      res.status(404).send({
        message: `Cannot Store Item Data`,
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
    res.redirect("items");
    return;
  }
  let query = {
    where: { id: id },
    attributes: ["id", "name", "status"],
  };
  try {
    const data = await commonService.get(Items, query);
    if (data) {
      res.render("items/show", { title: "Item-Show", items: data });
    } else {
      res.status(404).send({
        message: `Cannot find Item with id=${id}.`,
      });
    }
  } catch (error) {
    console.error("Error show item: ", error);
    res.status(500).render("error", { error: "Internal Server Error" });
  }
};

exports.edit = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.redirect("items");
    return;
  }
  let query = {
    where: { id: id },
    attributes: ["id", "name", "status"],
  };
  try {
    const data = await commonService.get(Items, query);
    if (data) {
      res.render("items/edit", { title: "Item-Edit", items: data });
    } else {
      res.status(404).send({
        message: `Cannot find Item with id=${id}.`,
      });
    }
  } catch (error) {
    console.error("Error show item: ", error);
    res.status(500).render("error", { error: "Internal Server Error" });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const dataCheck = await commonService.get(Items, { where: { id: id } });
  if (!dataCheck) {
    res.status(404).send({
      message: `Cannot find Item with id=${id}.`,
    });
  }

  let obj = {
    name: req.body.name,
    status: req.body.status,
  };
  try {
    const data = await commonService.update(Items, { where: { id: id } }, obj);
    if (data) {
      res.redirect("/items");
    } else {
      res.status(404).send({
        message: `Cannot Update Item Data`,
      });
    }
  } catch (err) {
    console.error("Error getAllData item: ", err);
    res.status(500).render("error", { error: "Internal Server Error" });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  const dataCheck = await commonService.get(Items, { where: { id: id } });
  if (!dataCheck) {
    res.status(404).send({
      success: false,
      message: `Cannot find Item with id=${id}.`,
    });
    return;
  }
  try {
    const data = await commonService.delete(Items, { where: { id: id } });
    if (data) {
      res.send({ success: true });
    } else {
      res.status(404).send({
        success: false,
        message: `Cannot Delete Item Data`,
      });
    }
  } catch (err) {
    console.error("Error getAllData item: ", err);
    res.status(500).render("error", { error: "Internal Server Error" });
  }
};

exports.getData = async (req, res) => {
  let query = {
    attributes: ["id", "name", "status"],
  };
  try {
    const data = await commonService.getAll(Items, query);
    if (data) {
      res.send(JSON.stringify(data));
    } else {
      res.status(404).send({
        message: `Cannot Item All Record Get`,
      });
    }
  } catch (error) {
    console.error("Error getAllData item: ", error);
    res.status(500).render("error", { error: "Internal Server Error" });
  }
};
