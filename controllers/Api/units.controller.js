const db = require("../../models");
const Units = db.units;
const { methods: commonService } = require("../../services/index");

exports.get = async (req, res) => {
  let query = {
    attributes: ["id", "name", "status"],
  };
  try {
    const data = await commonService.getAll(Units, query);
    if (data) {
      res.status(200).json({
        success: true,
        message: "Unit Data Get SuccessFully",
        data: data,
      });
    } else {
      res.status(200).json({
        success: false,
        message: `Cannot Unit All Record Get`,
      });
    }
  } catch (err) {
    res.status(200).json({ success: false, message: err.message });
  }
};

exports.store = async (req, res) => {
  const name = req.body.name;
  if (!name) {
    res.status(200).json({
      success: false,
      message: `Unit name can not be empty`,
    });
  }
  try {
    const data = await commonService.create(Units, {
      name: name,
    });
    if (data) {
      res.status(200).json({
        success: true,
        message: `Unit Stored SuccessFully!`,
        // latestRecordId: data.id,
      });
    } else {
      res.status(200).json({
        success: false,
        message: `Cannot Store Unit Data`,
      });
    }
  } catch (err) {
    res.status(200).json({ success: false, message: err.message });
  }
};

exports.show = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(200).json({
      success: false,
      message: `Unit Id Required!`,
    });
    return;
  }
  let query = {
    where: { id: id },
    attributes: ["id", "name", "status"],
  };
  try {
    const data = await commonService.get(Units, query);
    if (data) {
      res.status(200).json({
        success: true,
        message: `Unit Get SuccessFully!`,
        data: data,
      });
    } else {
      res.status(200).json({
        success: false,
        message: `Cannot Get Unit Data`,
      });
    }
  } catch (err) {
    res.status(200).json({ success: false, message: err.message });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const dataCheck = await commonService.get(Units, { where: { id: id } });
  if (!dataCheck) {
    res.status(200).json({
      success: false,
      message: `Cannot find Unit with id=${id}.`,
    });
    return;
  }

  try {
    const data = await commonService.update(
      Units,
      { where: { id: id } },
      {
        name: req.body.name,
        status: req.body.status,
      }
    );
    if (data) {
      res.status(200).json({
        success: true,
        message: `Unit Updated SuccessFully!`,
      });
    } else {
      res.status(200).json({
        success: false,
        message: `Cannot Update Unit Data`,
      });
    }
  } catch (err) {
    res.status(200).json({ success: false, message: err.message });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  const dataCheck = await commonService.get(Units, { where: { id: id } });
  if (!dataCheck) {
    res.status(200).json({
      success: false,
      message: `Cannot find Unit with id=${id}.`,
    });
    return;
  }
  try {
    const data = await commonService.delete(Units, { where: { id: id } });
    if (data) {
      res.status(200).json({
        success: true,
        message: `Unit Deleted SuccessFully!`,
      });
    } else {
      res.status(200).json({
        success: false,
        message: `Cannot Delete Unit Data`,
      });
    }
  } catch (err) {
    res.status(200).json({ success: false, message: err.message });
  }
};
