const db = require("../../models");
const Users = db.users;
const { methods: commonService } = require("../../services/index");

exports.login = async (req, res) => {
  const email = req.body.email;
  const pwd = req.body.password;
  let query = {
    where: [{ email: email, status: "Active" }],
    attributes: ["id", "name", "email", "password", "status"],
  };
  const isExistingEmail = await commonService.get(Users, query);
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
      res.status(200).json({
        success: "true",
        message: "Login SuccessFully!.",
        data: {
          id: isExistingEmail.id,
          name: isExistingEmail.name,
          email: isExistingEmail.email,
          status: isExistingEmail.status,
          token: token,
        },
      });
    } else {
      res.redirect("login", { error: "Invalid Credential." });
    }
  } else {
    res.redirect("login", { error: "Email not valid." });
  }
};
