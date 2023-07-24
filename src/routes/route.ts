import { Router } from 'express';
import signupHandler from '../controllers/signupController';
import loginHandler from '../controllers/logincontroller';
import verifyToken from '../middlewares/authMiddleware';
import protectedHandler from '../controllers/protectedController';
// import sessionConfig from '../config/session-config';
const router = Router();


router.get('/protected',protectedHandler);
router.get('/verify', verifyToken);
router.post('/login', loginHandler);
router.post('/signup', signupHandler);
// router.post('/session',sessionConfig);

export default router;
