import { AgeGroup, Level, Size } from '@constants/enums.js';
import { z } from 'zod';

export const createPetSchema = z.object({
  name: z.string().min(2),
  about: z.string().min(1),
  age: z.enum([AgeGroup.ADULT, AgeGroup.SENIOR, AgeGroup.YOUNG]),
  size: z.enum([Size.SMALL, Size.MEDIUM, Size.LARGE]),
  energyLevel: z.enum([Level.LOW, Level.MEDIUM, Level.HIGH]),
  independenceLevel: z.enum([Level.LOW, Level.MEDIUM, Level.HIGH]),
  roomSize: z.enum([Size.SMALL, Size.MEDIUM, Size.LARGE]),
  photos: z.string().array().default([]),
  requirements: z.string().array().default([]),
  organizationId: z.string().uuid(),
});
