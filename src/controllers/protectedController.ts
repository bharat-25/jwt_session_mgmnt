import {Request, Response} from 'express';


const protectedHandler = (req:Request, res:Response) => {
  res.json({ message: 'Protected route' });
};

export default protectedHandler;
