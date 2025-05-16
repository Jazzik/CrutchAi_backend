import { Router } from 'express';
import { authController } from '../controllers/auth.controller';

export const authRouter = Router();
/**
  * @openapi
  * /api/auth/google:
  *   get:
  *     summary: Start Google OAuth login
  *     responses:
  *       200:
  *         description: Returns the Google OAuth URL
 *       500:
 *         description: Internal server error
 */
authRouter.get('/google', authController.googleOAuth);

/**
  * @openapi
  * /api/auth/verify:
  *   post:
  *     summary: Verify a Supabase JWT
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               token:
  *                 type: string
  *     responses:
  *       200:
  *         description: Returns the user info
 *       401:
 *         description: Invalid or expired token
 *       500:
 *         description: Internal server error
  */
authRouter.post('/verify', authController.verifyToken);
