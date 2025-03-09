// *************** IMPORT LIBRARY ***************
import express from 'express';

// *************** IMPORT CONTROLLERS ***************
import UserController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/auth/google', UserController.RequestAuthGoogleController);
router.get('/auth/google/callback', UserController.HandleAuthGoogleController);

// *************** EXPORT ROUTERS ***************
export default router;
