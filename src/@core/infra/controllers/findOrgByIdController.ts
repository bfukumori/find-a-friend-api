import { FindOrgByIdUseCase } from '@use-cases/findOrgByIdUseCase.js';
import { FastifyReply, FastifyRequest } from 'fastify';
import { findOrgByIdSchema } from './schemas/findOrgByIdSchema.js';

export class FindOrgByIdController {
  constructor(private readonly findOrgByIdUseCase: FindOrgByIdUseCase) {}

  async handler(req: FastifyRequest, res: FastifyReply) {
    const params = findOrgByIdSchema.parse(req.params);
    const { id } = params;

    const org = await this.findOrgByIdUseCase.execute(id);

    return res.status(200).send(org);
  }
}
