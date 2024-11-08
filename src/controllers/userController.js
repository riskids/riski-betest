const User = require('../models/User');
const { cacheUser } = require('../services/cacheService');

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ message: 'User created successfully', user });
  } catch (error) {
    res.status(400).send({ message: 'Failed to create user', error });
  }
};

exports.getUserByAccountNumber = async (req, res) => {
    try {
      const user = await User.findOne({ accountNumber: req.params.accountNumber });
      if (!user) return res.status(404).send({ message: 'User not found' });
      
    //   cacheUser(req.params.accountNumber, user);
      
      res.send({ message: 'User retrieved successfully', user });
    } catch (error) {
      res.status(500).send({ message: 'Error retrieving user', error });
    }
  };
  

exports.getUserByIdentityNumber = async (req, res) => {
  try {
    const user = await User.findOne({ identityNumber: req.params.identityNumber });
    if (!user) return res.status(404).send({ message: 'User not found' });
    // cacheUser(req.params.identityNumber, getUserByIdentityNumber);
    res.send({ message: 'User retrieved successfully', user });
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving user', error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) return res.status(404).send({ message: 'User not found' });
    res.send({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(400).send({ message: 'Failed to update user', error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send({ message: 'User not found' });
    res.send({ message: 'User deleted successfully', user });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting user', error });
  }
};
