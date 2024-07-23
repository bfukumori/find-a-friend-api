import { AgeGroup, Level, Size } from '@constants/enums.js';
import { z } from 'zod';

export const findAllPetsSchema = z.object({
  city: z.string().min(3),
  age: z.enum([AgeGroup.ADULT, AgeGroup.SENIOR, AgeGroup.YOUNG]).optional(),
  size: z.enum([Size.SMALL, Size.MEDIUM, Size.LARGE]).optional(),
  energyLevel: z.enum([Level.LOW, Level.MEDIUM, Level.HIGH]).optional(),
  independenceLevel: z.enum([Level.LOW, Level.MEDIUM, Level.HIGH]).optional(),
});
