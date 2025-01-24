

import jwt from 'jsonwebtoken';

const JWT_SECRET = "your_jwt_secret"; 
const JWT_EXPIRES_IN = "15d"; 

export const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};
