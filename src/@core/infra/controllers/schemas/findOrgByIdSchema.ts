import { z } from 'zod';

export const findOrgByIdSchema = z.object({
  id: z.string().uuid(),
});
