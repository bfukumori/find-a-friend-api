import { AgeGroup, Level, Size } from '@constants/enums.js';
import { ClientError } from '@errors/ClientError.js';
import { makeCreatePet } from '@factories/makeCreatePet.js';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

const createPetSchema = z.object({
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

export async function createPetController(
  req: FastifyRequest,
  res: FastifyReply
): Promise<void> {
  const params = createPetSchema.parse(req.body);

  try {
    const useCase = makeCreatePet();
    await useCase.execute(params);

    return res.status(201).send();
  } catch (error) {
    if (error instanceof ClientError) {
      return res.status(error.code).send({ message: error.message });
    }
  }
}
