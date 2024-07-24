import { beforeAll } from 'vitest';
import resetDb from './reset-db.js';

beforeAll(async () => {
  await resetDb();
});
