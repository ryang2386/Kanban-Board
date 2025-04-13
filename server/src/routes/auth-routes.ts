import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body;
  // checks if the username exists
  const user = await User.findOne({
    where: { username }, 
  });

  // if user doesn't exist, return 401 error
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // if password is not valid, return 401 error
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // if user and password is valid, assign a JWT token
  const secretKey = process.env.JWT_SECRET_KEY || '';
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  return res.json({ token });
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
