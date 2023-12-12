const db = require("../../models");
const Users = db.users;
const { methods: commonService } = require("../../services/index");

exports.get = async (req, res) => {
  res.render("login", { title: "Login" });
};
exports.login = async (req, res) => {
  const email = req.body.email;
  const pwd = req.body.password;
  let query = {
    where: [{ email: email, status: "Active" }],
    attributes: ["id", "name", "email", "password", "status"],
  };
  const isExistingEmail = await commonService.get(Users, query);
  console.log("isExistingEmail :: ", isExistingEmail);
  if (isExistingEmail) {
    let passwordValidate = await commonService.passwordCompare(
      pwd,
      isExistingEmail.password
    );
    let token = commonService.generateToken(
      isExistingEmail.id,
      isExistingEmail.email
    );
    if (passwordValidate == true) {
      res.cookie("_nju", token);
      res.redirect(302, "/dashboard");
    } else {
      res.render("login", { error: "Invalid Credential.", title: "Login" });
    }
  } else {
    res.render("login", { error: "Email not valid.", title: "Login" });
  }
};

exports.logout = (req, res) => {
  // Clear the user session (delete the authentication cookie)
  res.clearCookie("_nju");

  // Redirect to the root after logout
  res.redirect("/");
};
