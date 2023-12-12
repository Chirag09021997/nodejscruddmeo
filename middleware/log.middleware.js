const fs = require("fs");
module.exports = (req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n Time=>${Date.now()}, IP=>${req.ip}, Method=>${req.method}, Route=>${
      req.path
    }`,
    (err, data) => {
      next();
    }
  );
};
