import { UserDetailsDTO } from './../../dto/user-details';
import { ACTIONS } from './account.types';

export const getUserData = (token: string) => {
  return {
    type: ACTIONS.GET_USER_DATA,
    payload: token
  };
};

export const loadUserData = (userDetails: UserDetailsDTO) => {
  return {
    type: ACTIONS.LOAD_USER_DATA,
    payload: userDetails
  };
};

export const saveUserData = (userDetails: any) => {
  return {
    type: ACTIONS.UPDATE_USER_DATA,
    payload: userDetails
  };
};

export const logout = () => {
  return {
    type: ACTIONS.LOGOUT,
    payload: false
  };
};
