import Hapi from '@hapi/hapi';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import generateJwtToken from '../jwt/jwt_generator';
import { getRepository } from 'typeorm';
import { User } from '../../ds/models/user';

export const registerHandler = () => {
  return async function (request: Hapi.Request, h: any) {
    const payload: any = request.payload;
    const { username, password } = payload;
    if ((await getRepository(User).find({ where: { username: username } })).length) {
      return h.response().code(409).message('Already Registered');
    }
    await getRepository(User).save(new User(username, bcrypt.hashSync(password, bcrypt.genSaltSync(10)), '', '', ''));

    return h.response().code(201);
  };
};

export const loginHandler = () => {
  return async function (request: Hapi.Request, h: any) {
    const payload: any = request.payload;
    const { username, password } = payload;
    const user = await getRepository(User).findOne({ where: { username: username } });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = generateJwtToken(user);
        return h.response(token).header('auth-token', token, { append: true });
      } else {
        return h.response('Wrong pass').code(401);
      }
    }

    return h.response('Wrong pass').code(401);
  };
};

export const getUserDetailsHandler = () => {
  return async function (request: Hapi.Request, h: any) {
    const payload: any = request.payload;
    const { token } = payload;
    console.log('ajung cu tokenul: ', token);
    try {
      const { id, username, password, ...user } = (await getRepository(User).findOne({
        where: { username: (jwt.decode(token) as any).username }
      }))!;
      return h.response(user).code(200);
    } catch (e) {
      console.log(e);
    }
  };
};

export const updateUserDetailsHandler = () => {
  return async function (request: Hapi.Request, h: any) {
    const payload: any = request.payload;
    const { token, newUserDetails } = payload;
    console.log('ajung cu tokenul: ', token);
    try {
      const user = (await getRepository(User).findOne({
        where: { username: (jwt.decode(token) as any).username }
      }));
      const updatedUser = await getRepository(User).save({ ...user, ...newUserDetails });
      return h.response(updatedUser).code(200);
    } catch (e) {
      console.log(e);
    }
  };
};
