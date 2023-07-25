import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import Joi from "joi";
import jwt from "jsonwebtoken";
import User from "../models/user";
import redisclient from "../redis/redis";

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const login: RequestHandler = async (req, res) => {

  // Validate user input
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Check if user exists
  const user = await User.findOne({ email: value.email });
  if (!user) {
    return res.status(400).json({ error: "Invalid email or password" });
  }
   // Store the login token and status in Redis
  //  await redisclient.set(`token:${user._id}`, token);
   await redisclient.set(`status:${user._id}`, 'true');

  // Verify the password
  const validPassword = await bcrypt.compare(value.password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  // Generate a JWT token for the user
  const token = user.generateAuthToken();

  res.json({ token });
};

export default login;
