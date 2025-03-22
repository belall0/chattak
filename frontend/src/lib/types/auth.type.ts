import { z } from 'zod';
import { loginSchema, signupSchema } from '@/lib/schemas/auth.schema';

// Infer types from Zod schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
