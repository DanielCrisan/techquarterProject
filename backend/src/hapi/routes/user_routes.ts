import { registerHandler, loginHandler, getUserDetailsHandler, updateUserDetailsHandler } from '../handlers/user_handlers';
import { ResponseToolkit } from '@hapi/hapi';
import Joi from 'joi';

export const userRoutes: any = [
  {
    method: 'POST',
    path: '/register',
    handler: registerHandler(),
    options: {
      auth: false,
      validate: {
        payload: Joi.object({
          username: Joi.string().required(),
          password: Joi.string().required().min(8).max(30)
        }) as any,
        failAction(request: Request, h: ResponseToolkit, err: Error) {
          throw err;
        },
        options: {
          abortEarly: false
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/login',
    handler: loginHandler(),
    options: {
      auth: false
    }
  },
  {
    method: 'POST',
    path: '/userDetails',
    handler: getUserDetailsHandler(),
    options: {
      auth: false
    }
  },
  {
    method: 'POST',
    path: '/newUserDetails',
    handler: updateUserDetailsHandler(),
    options: {
      auth: false
    }
  }
];
