const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

exports.login = async (req, res) => {
  const { emailAddress } = req.body;
  const user = await User.findOne({ emailAddress });
  if (!user) return res.status(400).send({ error: 'Invalid login credentials' });

  const token = generateToken(user);
  res.send({ user, token });
};
