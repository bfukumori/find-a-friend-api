import { errorHandler } from '@errors/error-handler.js';
import { orgRoutes } from '@routes/orgRoutes.js';
import { petRoutes } from '@routes/petRoutes.js';
import fastify from 'fastify';

const app = fastify();

app.setErrorHandler(errorHandler);

app.register(petRoutes);
app.register(orgRoutes);

app.listen({ port: 3000 }, () => {
  console.log('Server is running on port 3000');
});
