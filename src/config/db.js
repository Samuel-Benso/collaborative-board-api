import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import 'dotenv/config';

// 1. Create a connection pool to your local Postgres
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// 2. Setup the Prisma 7 Adapter
const adapter = new PrismaPg(pool);

// 3. Initialize the Client with that adapter (Required in v7)
const prisma = new PrismaClient({ adapter });

export default prisma;