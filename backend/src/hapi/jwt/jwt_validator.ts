import { ResponseToolkit } from '@hapi/hapi';
import { getRepository } from 'typeorm';
import { getConnection } from '../../ds/factories/databases_connection_factory';
import { User } from '../../ds/models/user';

export const validateJWT = async () => {
  const userRepository = (await getConnection()).getRepository(User);
  return async ({ id }: Partial<User>, request: Request, h: ResponseToolkit) => {
    const user: User | undefined = await userRepository.findOne(id);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: { userId: user.id, username: user.username } };
  };
};
