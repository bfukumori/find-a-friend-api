import { FastifyInstance } from 'fastify';
import { ZodError } from 'zod';

type FastifyErrorHandler = FastifyInstance['errorHandler'];

export const errorHandler: FastifyErrorHandler = async (error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation input error',
      errors: error.flatten().fieldErrors,
    });
  }

  return reply.status(500).send({ message: 'Internal Server Error' });
};
