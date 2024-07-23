import { CreatePetUseCase } from '@use-cases/createPetUseCase.js';
import { FastifyReply, FastifyRequest } from 'fastify';
import { createPetSchema } from './schemas/createPetSchema.js';

export class CreatePetController {
  constructor(private readonly createPetUseCase: CreatePetUseCase) {}

  async handler(req: FastifyRequest, res: FastifyReply): Promise<void> {
    const params = createPetSchema.parse(req.body);

    await this.createPetUseCase.execute(params);

    return res.status(201).send();
  }
}
