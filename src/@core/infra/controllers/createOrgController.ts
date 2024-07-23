import { CreateOrgUseCase } from '@use-cases/createOrgUseCase.js';
import { FastifyReply, FastifyRequest } from 'fastify';
import { createOrgSchema } from './schemas/createOrgSchema.js';

export class CreateOrgController {
  constructor(private readonly createOrgUseCase: CreateOrgUseCase) {}

  async handler(req: FastifyRequest, res: FastifyReply): Promise<void> {
    const params = createOrgSchema.parse(req.body);

    await this.createOrgUseCase.execute(params);

    return res.status(201).send();
  }
}
