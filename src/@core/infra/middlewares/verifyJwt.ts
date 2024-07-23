import { InvalidCredentials } from '@errors/InvalidCredentials.js';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function verifyJwt(req: FastifyRequest, res: FastifyReply) {
  try {
    await req.jwtVerify();
  } catch (error) {
    throw new InvalidCredentials('Unauthorized');
  }
}
