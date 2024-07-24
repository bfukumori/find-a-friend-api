import { errorHandler } from '@errors/error-handler.js';
import fastifyJwt from '@fastify/jwt';
import { orgRoutes } from '@routes/orgRoutes.js';
import { petRoutes } from '@routes/petRoutes.js';
import fastify from 'fastify';
import { env } from './env.js';

const app = fastify();

app.setErrorHandler(errorHandler);

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(petRoutes);
app.register(orgRoutes);

export { app };
