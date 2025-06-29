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

export const getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments(); // Count all user documents
    res.status(200).json({ totalUsers });
  } catch (err) {
    console.error("Error in getTotalUsers controller:", err);
    return res.status(500).json({ error: "Failed to get total users" });
  }
};

// Get all customers with basic analytics
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await User.find().select(
      'customerId name email contact location ordersCount totalSpent status joinedAt lastOrderDate'
    );

    const formatted = customers.map((cust) => ({
      id: cust.customerId,
      name: cust.name,
      email: cust.email,
      phone: cust.contact,
      location: cust.location || 'Unknown',
      totalOrders: cust.ordersCount || 0,
      totalSpent: `₹${(cust.totalSpent || 0).toFixed(2)}`,
      status: cust.status,
      joinDate: cust.joinedAt.toISOString().split('T')[0],
      lastOrder: cust.lastOrderDate ? cust.lastOrderDate.toISOString().split('T')[0] : 'Never'
    }));

    res.status(200).json({ customers: formatted });
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ message: 'Failed to fetch customers' });
  }
};
