import express from 'express';
import { loginUser, registerUser } from './user.service.js';

const router=express.Router();


// register user
router.post('/user/register',registerUser);

//login user
router.get('/user/login',loginUser );



export default router;

