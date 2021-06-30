import { UserRepository } from '../../api/user_repository';
import { getConnection } from '../../factories/databases_connection_factory';
import { User } from '../../models/user';
import bcrypt from 'bcrypt';

export class SqliteUserRepository implements UserRepository {
  async create(user: User): Promise<void> {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    await (await getConnection()).getRepository(User).save(user);
  }
}
