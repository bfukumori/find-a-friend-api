import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { FastifyInstance } from 'fastify';
import { ZodError } from 'zod';
import { ClientError } from './ClientError.js';
import { InvalidCredentials } from './InvalidCredentials.js';

type FastifyErrorHandler = FastifyInstance['errorHandler'];

export const errorHandler: FastifyErrorHandler = async (error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation input error',
      errors: error.flatten().fieldErrors,
    });
  }

  if (error instanceof InvalidCredentials) {
    return reply.status(403).send({ message: error.message });
  }

  if (error instanceof ClientError) {
    return reply.status(422).send({
      message: error.message,
    });
  }

  if (error instanceof PrismaClientKnownRequestError) {
    return reply.status(400).send({
      error,
    });
  }

  return reply.status(500).send({ message: 'Internal Server Error' });
};
