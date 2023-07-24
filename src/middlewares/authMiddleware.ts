import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}


const verifyTokenSchema = Joi.object({
  authorization: Joi.string().required(),
});

const verifyToken: RequestHandler = async (req, res, next) => {
  // Validate the token in the request header
  const { error, value } = verifyTokenSchema.validate(req.headers, {
    allowUnknown: true,
  });
  if (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Verify the token
  try {
    const decoded = jwt.verify(value.authorization, process.env.JWT_SECRET_KEY!);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

export default verifyToken;
