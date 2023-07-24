import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import User from '../models/user';

const signupSchema = Joi.object({
  username: Joi.string().min(5).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const signupHandler: RequestHandler = async (req, res) => {
  
  // Validate user input
  const { error, value } = signupSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Check if user already exists

  const existingUser = await User.findOne({ email: value.email });

  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(2);
  const hashedPassword = await bcrypt.hash(value.password, salt);

  // Create a new user
  const user = new User({
    username: value.username,
    email: value.email,
    password: hashedPassword,
  });
  
  await user.save();
  res.status(201).json({ message: 'User created successfully' });
  next();
};

export default signupHandler;

function next() {
  throw new Error('Function not implemented.');
}

