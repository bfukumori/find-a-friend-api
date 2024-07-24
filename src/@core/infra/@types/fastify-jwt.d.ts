import '@fastify/jwt';

enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

type RoleType = keyof typeof Role;

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { role: RoleType };
    user: {
      sub: string;
    };
  }
}
