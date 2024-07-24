import { errorHandler } from '@errors/error-handler.js';
import fastifyJwt from '@fastify/jwt';
import { orgRoutes } from '@routes/orgRoutes.js';
import { petRoutes } from '@routes/petRoutes.js';
import { fastify } from './@core/infra/libs/fastify.js';

fastify.setErrorHandler(errorHandler);

fastify.register(fastifyJwt, {
  secret: 'supersecret',
});

fastify.register(petRoutes);
fastify.register(orgRoutes);

fastify.listen({ port: 3000 }, () => {
  console.log('Server is running on port 3000');
});

export default fastify;
