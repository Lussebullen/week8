import pg from 'pg';
import dotenv from 'dotenv';
import { env } from './env';

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  user: env.POSTGRES_USER,
  host: env.POSTGRES_HOST,
  database: env.POSTGRES_DB,
  password: env.POSTGRES_PASSWORD,
  port: Number(env.POSTGRES_PORT),
});