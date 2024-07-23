import { ClientError } from '@errors/ClientError.js';
import { makeFindPetById } from '@factories/makeFindPetById.js';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

const findPetByIdSchema = z.object({
  id: z.string().uuid(),
});

export async function findPetByIdController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const params = findPetByIdSchema.parse(req.params);
  const { id } = params;

  try {
    const useCase = makeFindPetById();
    const pet = await useCase.execute(id);

    return res.status(200).send(pet);
  } catch (error) {
    if (error instanceof ClientError) {
      return res.status(error.code).send({ message: error.message });
    }
  }
}
