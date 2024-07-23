import { FindAllPetsUseCase } from '@use-cases/findAllPetsUseCase.js';
import { FastifyReply, FastifyRequest } from 'fastify';
import { findAllPetsSchema } from './schemas/findAllPetsSchema.js';

export class FindAllPetsController {
  constructor(private readonly findAllPetsUseCase: FindAllPetsUseCase) {}

  async handler(req: FastifyRequest, res: FastifyReply): Promise<void> {
    const query = findAllPetsSchema.parse(req.query);

    const pets = await this.findAllPetsUseCase.execute(query);

    return res.status(200).send({ pets });
  }
}
