import { Request, Response, NextFunction } from 'express';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { supabase } from '../config/supabase';

export class AuthController {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = supabase;
    this.googleOAuth = this.googleOAuth.bind(this);
    this.verifyToken = this.verifyToken.bind(this);
  }

  /**
   * Initiate Google OAuth login
   */
  async googleOAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const redirectTo = req.query.redirectTo as string || process.env.GOOGLE_REDIRECT_URI;
      const { data, error } = await this.supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      if (error) return next(error);
      res.json({ url: data?.url });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Verify a Supabase JWT
   */
  async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const schema = z.object({
        token: z.string().min(1),
      });
      const result = schema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: 'Invalid request body', details: result.error.format() });
      }
      const { token } = result.data;
      const { data, error } = await this.supabase.auth.getUser(token);
      if (error) return res.status(401).json({ error: 'Invalid token' });
      res.json({ user: data.user });
    } catch (err) {
      next(err);
    }
  }
}

export const authController = new AuthController();
