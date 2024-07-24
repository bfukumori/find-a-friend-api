import { AgeGroup, Level, Size } from '@constants/enums.js';
import { makeFindAllPets } from '@factories/makeFindAllPets.js';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

const findAllPetsSchema = z.object({
  city: z.string().min(3),
  age: z.enum([AgeGroup.ADULT, AgeGroup.SENIOR, AgeGroup.YOUNG]).optional(),
  size: z.enum([Size.SMALL, Size.MEDIUM, Size.LARGE]).optional(),
  energyLevel: z.enum([Level.LOW, Level.MEDIUM, Level.HIGH]).optional(),
  independenceLevel: z.enum([Level.LOW, Level.MEDIUM, Level.HIGH]).optional(),
});

export async function findAllPetsController(
  req: FastifyRequest,
  res: FastifyReply
): Promise<void> {
  const query = findAllPetsSchema.parse(req.query);

  const useCase = makeFindAllPets();
  const pets = await useCase.execute(query);

  return res.status(200).send({ pets });
}
