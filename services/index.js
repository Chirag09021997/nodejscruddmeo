const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const methods = {
  get: async (model, query, additional = undefined) => {
    return model.findOne(query, additional || undefined);
  },
  getAll: async (model, query, limit = 10, offset = 0) => {
    return model.findAll({ ...query, limit, offset });
  },
  create: async (model, data, additional = undefined) => {
    return model.create(data, additional || undefined);
  },
  update: async (model, query, data, additional = undefined) => {
    return model.update(data, query, additional || undefined);
  },
  delete: async (model, query, additional = undefined) => {
    return model.destroy(query, additional || undefined);
  },
  generateHashPassword: async (myPassword, salt) => {
    return await bcrypt.hashSync(myPassword, salt);
  },
  passwordCompare: async (myPassword, hash, additional = undefined) => {
    return await bcrypt.compareSync(myPassword, hash, additional || undefined);
  },
  generateToken: (user_id, email) => {
    let token = jwt.sign(
      { user_id: user_id, user_email: email },
      process.env.JWT_SECRET_KEY || "testerDemoCreate",
      { expiresIn: process.env.EXPIRES_IN || "1D" }
    );
    return token;
  },
  verifyToken: async (token) => {
    if (!token) return null;
    try {
      return jwt.verify(
        token,
        process.env.JWT_SECRET_KEY || "testerDemoCreate"
      );
    } catch (error) {
      return null;
    }
  },
};

module.exports = { methods };
