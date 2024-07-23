import { ClientError } from '@errors/ClientError.js';
import { makeFindOrgById } from '@factories/makeFindOrgById.js';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

const findOrgByIdSchema = z.object({
  id: z.string().uuid(),
});

export async function findOrgByIdController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const params = findOrgByIdSchema.parse(req.params);
  const { id } = params;

  try {
    const useCase = makeFindOrgById();
    const org = await useCase.execute(id);

    Reflect.deleteProperty(org, 'password');

    return res.status(200).send(org);
  } catch (error) {
    if (error instanceof ClientError) {
      return res.status(error.code).send({ message: error.message });
    }
  }
}
