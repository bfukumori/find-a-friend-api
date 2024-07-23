import { FindPetByIdUseCase } from '@use-cases/findPetByIdUseCase.js';
import { FastifyReply, FastifyRequest } from 'fastify';
import { findPetByIdSchema } from './schemas/findPetByIdSchema.js';

export class FindPetByIdController {
  constructor(private readonly findPetByIdUseCase: FindPetByIdUseCase) {}

  async handler(req: FastifyRequest, res: FastifyReply) {
    const params = findPetByIdSchema.parse(req.params);
    const { id } = params;

    const pet = await this.findPetByIdUseCase.execute(id);

    return res.status(200).send(pet);
  }
}
