import { Router } from 'express';

export const healthRouter = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     responses:
 *       200:
 *         description: OK
 */
healthRouter.get('/', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});
