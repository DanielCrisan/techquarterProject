import { UserCredentialsDTO } from '../../dto/user-credentials';
import { ACTIONS } from './login.types';

export const login = (userCredentials: UserCredentialsDTO) => {
  return {
    type: ACTIONS.LOGIN_ATTEMPT,
    payload: userCredentials
  };
};

export const saveLogin = (token: string) => {
  return {
    type: ACTIONS.LOGIN_SUCCESS,
    payload: token
  };
};
