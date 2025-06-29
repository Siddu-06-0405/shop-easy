import User from '../models/user.model.js';
import generateToken from '../utils/generateToken.js';

export const registerUser = async (req, res) => {
  const { name, email, password, contact, location } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const customerId = 'CUST-' + Math.floor(1000 + Math.random() * 9000);

  const user = await User.create({
    customerId,
    name,
    email,
    password,
    contact,
    location,
  });

  res.status(201).json({
    _id: user._id,
    customerId: user.customerId,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      customerId: user.customerId,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      customerId: user.customerId,
      name: user.name,
      email: user.email,
      contact: user.contact,
      location: user.location,
      ordersCount: user.ordersCount,
      lastOrderDate: user.lastOrderDate,
      totalSpent: user.totalSpent,
      status: user.status,
      joinedAt: user.joinedAt,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};
