import { z } from 'zod';

export const createOrgSchema = z.object({
  owner: z.string().min(3),
  email: z.string().email(),
  postalCode: z.string().min(8).max(8),
  addressName: z.string().min(3),
  addressNumber: z.string().min(1),
  neighborhood: z.string().min(3),
  city: z.string().min(3),
  state: z.string().min(2).max(2),
  latitude: z.number(),
  longitude: z.number(),
  whatsapp: z.string().min(11),
  password: z.string().min(6),
});
