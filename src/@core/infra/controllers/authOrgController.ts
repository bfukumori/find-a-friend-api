import { ClientError } from '@errors/ClientError.js';
import { makeAuthOrg } from '@factories/makeAuthOrg.js';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

const authOrgSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function authOrgController(
  req: FastifyRequest,
  res: FastifyReply
): Promise<void> {
  const params = authOrgSchema.parse(req.body);

  try {
    const useCase = makeAuthOrg();
    const org = await useCase.execute(params);

    const token = await res.jwtSign(
      { role: 'ADMIN' },
      {
        sign: {
          sub: org.id,
          expiresIn: '1d',
        },
      }
    );

    return res.status(200).send({ token });
  } catch (error) {
    if (error instanceof ClientError) {
      return res.status(error.code).send({ message: error.message });
    }
  }
}
