import { errorHandler } from '@errors/error-handler.js';
import fastifyJwt from '@fastify/jwt';
import { orgRoutes } from '@routes/orgRoutes.js';
import { petRoutes } from '@routes/petRoutes.js';
import { fastify } from './@core/infra/libs/fastify.js';
import { env } from './env.js';

fastify.setErrorHandler(errorHandler);

fastify.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

fastify.register(petRoutes);
fastify.register(orgRoutes);

fastify.listen({ port: env.PORT }, function (err, address) {
  if (env.NODE_ENV !== 'production') {
    console.error(err);
  }
  console.log(`Server listening on ${address}`);
});

export default fastify;
