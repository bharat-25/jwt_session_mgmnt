import { RequestHandler } from 'express';

const protectedHandler: RequestHandler = (req, res) => {
  res.json({ message: 'Protected route' });
};

export default protectedHandler;
