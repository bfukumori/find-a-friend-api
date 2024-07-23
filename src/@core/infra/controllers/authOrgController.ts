import { AuthOrgUseCase } from '@use-cases/authOrgUseCase.js';
import { FastifyReply, FastifyRequest } from 'fastify';
import { authOrgSchema } from './schemas/authOrgSchema.js';

export class AuthOrgController {
  constructor(private readonly authOrgUseCase: AuthOrgUseCase) {}

  async handler(req: FastifyRequest, res: FastifyReply): Promise<void> {
    const params = authOrgSchema.parse(req.body);

    await this.authOrgUseCase.execute(params);

    return res.status(200).send();
  }
}
