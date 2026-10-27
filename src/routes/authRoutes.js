import {Router} from "express";
import { loginUser, logoutUser, refreshUserSession, registerUser, requestResetEmail, resetPasswrd } from "../controllers/authController.js";
import { celebrate } from "celebrate";
import { registerUserSchema, loginUserSchema, requestResetEmailSchema, resetPasswrdSchema } from "../validations/authValidation.js";

const router = Router();

router.post('/auth/register', celebrate(registerUserSchema), registerUser);

router.post('/auth/login', celebrate(loginUserSchema), loginUser);

router.post('/auth/logout', logoutUser);

router.post('/auth/refresh', refreshUserSession);

router.post('/auth/request-reset-email', celebrate(requestResetEmailSchema), requestResetEmail);

router.post('/auth/reset-password', celebrate(resetPasswrdSchema), resetPasswrd);


export default router;
