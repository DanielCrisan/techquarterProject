import { HapiServer } from './hapi/hapi';
import { User } from './ds';
import { UserRepository } from './ds/api/user_repository';
import { SqliteUserRepository } from './ds/sources/sqlite/sqlite_user_repository';

// const userRepository: UserRepository = new SqliteUserRepository();
// userRepository
//   .create(new User('test', 'test', 'Paris', 'California', 'France'))
//   .then(() => foo())
//   .catch(err => console.log(err));

// const foo = async () => {
//   userRepository
//     .create(new User('test2', 'test2', 'Miami', 'Florida', 'United States of America'))
//     .then(() => initServer())
//     .catch(err => console.log(err));
// };

// const initServer = async () => {
//   new HapiServer().initServer();
// };

new HapiServer().initServer();

