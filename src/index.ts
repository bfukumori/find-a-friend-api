import { errorHandler } from '@errors/error-handler.js';
import fastifyJwt from '@fastify/jwt';
import { orgRoutes } from '@routes/orgRoutes.js';
import { petRoutes } from '@routes/petRoutes.js';
import { app } from './@core/infra/libs/fastify.js';

app.setErrorHandler(errorHandler);

app.register(fastifyJwt, {
  secret: 'supersecret',
});

app.register(petRoutes);
app.register(orgRoutes);

app.listen({ port: 3000 }, () => {
  console.log('Server is running on port 3000');
});
