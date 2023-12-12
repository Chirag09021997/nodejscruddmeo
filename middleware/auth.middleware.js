const { methods: commonService } = require("../services");
const authCheck = async (req, res, next) => {
  const token = req.cookies?._nju;
  if (!token) return res.redirect("/login");
  var authUser = commonService.verifyToken(token);
  try {
    if (!authUser) {
      return res.redirect("/login");
    }
    req.authUser = authUser;
    next();
  } catch (error) {
    return res.redirect("/login");
  }
};

const apiAuthCheck = async (req, res, next) => {
  const authorizationValue = req.headers["authorization"];
  if (!authorizationValue || !authorizationValue.startsWith("Bearer"))
    return res
      .status(400)
      .json({ success: false, message: "Token is required" });

  const token = authorizationValue.split("Bearer ")[1];
  var authUser = await commonService.verifyToken(token);
  try {
    if (!authUser) {
      return res
        .status(400)
        .json({ success: false, message: "Token is not valid!." });
    }
    req.authUser = authUser;
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Token is not valid!." });
  }
};

module.exports = { authCheck, apiAuthCheck };
