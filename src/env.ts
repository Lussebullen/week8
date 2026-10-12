import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  POSTGRES_HOST: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_PORT: z.coerce.number().default(5432),
  APP_PORT: z.coerce.number().default(3000),
});

const validateEnv = envSchema.safeParse(process.env);

if (!validateEnv.success) {
  console.error('Invalid environment variables:', z.treeifyError(validateEnv.error));
  process.exit(1);
}

export const env = validateEnv.data;