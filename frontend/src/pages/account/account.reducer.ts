import { UserDetailsDTO } from '../../dto/user-details';
import { ACTIONS } from './account.types';

interface Action {
  type: string;
  payload: {
    userDetails: UserDetailsDTO;
  };
}

const accountDefaultState = {
  userDetails: {}
};

export const AccountReducer = (state = accountDefaultState, action: Action) => {
  switch (action.type) {
    case ACTIONS.LOAD_USER_DATA:
      return { ...state, userDetails: action.payload };
    case ACTIONS.UPDATE_USER_DATA:
      return { ...state, userDetails: action.payload };
    case ACTIONS.LOGOUT:
      return { ...state, isLogged: false, userToken: '' };
    default:
      return state;
  }
};
