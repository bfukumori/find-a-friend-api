import { z } from 'zod';

export const createOrgSchema = z.object({
  owner: z.string().min(3),
  email: z.string().email(),
  postalCode: z
    .string()
    .regex(/^\d{8}$/, 'Invalid postal code, must have 8 digits'),
  addressName: z.string().min(3),
  addressNumber: z.string().min(1).regex(/^\d+$/),
  neighborhood: z.string().min(3),
  city: z.string().min(3),
  state: z
    .string()
    .regex(/^[a-zA-Z]{2}$/, 'Invalid state, must have 2 letters'),
  latitude: z.number(),
  longitude: z.number(),
  whatsapp: z
    .string()
    .regex(/^\d{11}$/, 'Invalid whatsapp number, must have 11 digits'),
  password: z.string().min(6),
});
