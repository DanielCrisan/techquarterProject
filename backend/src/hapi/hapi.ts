import Hapi from '@hapi/hapi';
import { DOMAIN, PORT } from '../ds';
import { SECRET_TOKEN } from '../ds/secrets';
import { validateJWT } from './jwt/jwt_validator';
import { residenceRoutes } from './routes/residence_routes';
import { userRoutes } from './routes/user_routes';

async function init() {
  const server = Hapi.server({
    port: PORT,
    host: DOMAIN,
    routes: {
      cors: true
    }
  });

  await server.register(require('hapi-auth-jwt2'));

  server.auth.strategy('jwt', 'jwt', {
    key: SECRET_TOKEN,
    validate: validateJWT()
  });
  server.auth.default('jwt');
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Hello, this is team3!';
    }
  });
  server.route(residenceRoutes);
  server.route(userRoutes);

  await server.start();
  console.log('Server running on %s', server.info.uri);

  process.on('unhandledRejection', err => {
    console.log(err);
    process.exit(1);
  });
}

export class HapiServer {
  initServer() {
    init();
  }
}
