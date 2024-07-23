import { FastifyReply, FastifyRequest } from 'fastify';

export async function verifyJwt(
  req: FastifyRequest,
  res: FastifyReply
): Promise<void> {
  try {
    await req.jwtVerify();
  } catch (error) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
}
