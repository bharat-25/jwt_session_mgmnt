import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { sessionModel } from '../models/session.model';
import redisclient from '../redis/redis';

export const sessionCheck = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const secretKey: string = 'mysecretkey';
  const token: string = '' + req.headers.authorization;
  let decode: any;

  try {
    decode = jwt.verify(token, secretKey);
  } catch (err) {
    res.send('Token expired or not valid');
    return;
  }

  try {
    const redisData: string | null = await redisclient.get(`${decode?._id}`);
    if (!(redisData === 'true')) {
      console.log('Cache miss');
      const data = await sessionModel.find({
        userId: decode._id,
        isActive: true,
      });
      data.length > 0 ? next() : res.send('Authentication error');
    } else {
      console.log('Cache hit');
      next();
    }
  } catch (err) {
    res.send('Error');
  }
};