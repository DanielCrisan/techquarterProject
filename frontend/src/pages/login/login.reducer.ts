import { ACTIONS } from './login.types';

interface Action {
  type: string;
  payload: string;
}

const loginDefaultState = {
  isLogged: false,
  userToken: ''
};

export const LoginReducer = (state = loginDefaultState, action: Action) => {
  switch (action.type) {
    case ACTIONS.LOGIN_SUCCESS:
      console.log("da", state);
      return { ...state, isLogged: true, userToken: action.payload };
    default:
      return state;
  }
};
