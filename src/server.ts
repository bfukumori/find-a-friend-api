import { app } from './app.js';
import { env } from './env.js';

app.listen({ port: env.PORT }, function (err, address) {
  if (err && env.NODE_ENV !== 'production') {
    console.error(err);
  }
  console.log(`Server listening on ${address}`);
});
