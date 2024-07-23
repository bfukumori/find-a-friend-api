import { z } from 'zod';

export const findPetByIdSchema = z.object({
  id: z.string().uuid(),
});
