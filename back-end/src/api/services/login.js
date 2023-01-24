const models = require('../../database/models/');
const md5 = require('md5');
const jwtUtils = require('../utils/jwt.utils');


const validateLogin = async(email, password) => {
  const user = await models.User.findOne({ where: { email }});
  if(!user) {
    return { type: 401, message: { message: 'Incorrect email or password' } };
  }
  const providedPass = md5(password);
  const dbPass = user.password;
  if (providedPass === dbPass) {
    const { password: _, ...payload } = user.dataValues;
    const token = jwtUtils.createToken(payload);
    return { type: 200, message: { ...payload, token } }
  } return { type: 401, message: { message: 'Incorrect email or password' } };
};

module.exports = {
  validateLogin,
};

