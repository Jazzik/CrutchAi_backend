import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';
import { healthRouter } from './routes/health';
import { authRouter } from './routes/auth';
import { swaggerOptions } from './docs/swaggerDef';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const host = process.env.HOST || '0.0.0.0';

// Middleware
app.use(helmet());
// Configure CORS with specific origins
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Add rate limiting to prevent abuse
import rateLimit from 'express-rate-limit';

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to all routes
app.use(apiLimiter);

// Add compression for response optimization
import compression from 'compression';
app.use(compression());
// Logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

// Swagger setup
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
// With versioning
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/health', healthRouter);


// Root API welcome route
app.get('/api', (req, res) => {
  res.json({ status: 'ok', message: 'Welcome to the CrutchAI API' });
});

// 404 handler
app.use((req, res) => {
  logger.warn(`404 Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: 'Not found', path: req.originalUrl });
});

// Central error handler
app.use(errorHandler);

app.listen(port, host, () => {
  logger.info(`Server running at http://${host}:${port}`);
  logger.info(`Swagger docs at http://${host}:${port}/api/docs`);
});
