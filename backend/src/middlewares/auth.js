// src/middlewares/auth.js
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

export const verifyAdmin = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  
  // Check if user is still active
  try {
    const { User } = await import('../models/index.js');
    const user = await User.findByPk(req.user.id);
    if (!user || !user.is_active || user.status !== 'accepted') {
      return res.status(403).json({ message: 'Account access denied' });
    }
  } catch (error) {
    console.error('User verification error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
  
  next();
};
