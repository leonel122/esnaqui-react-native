import {createActions, createReducer} from 'reduxsauce';
import produce from 'immer';

const INITIAL_STATE = {
  isAuthenticated: false,
  user: {},
};

const {Types, Creators} = createActions({
  setLogin: ['user'],
  setLogout: null,
});

const setLogin = (state, {user}) => {
  return produce(state, (draftState) => {
    draftState.isAuthenticated = true;
    draftState.user = user;
  });
};

const setLogout = (state) => {
  return produce(state, (draftState) => {
    Object.assign(draftState, INITIAL_STATE);
  });
};

// noinspection JSCheckFunctionSignatures
export const auth = createReducer(INITIAL_STATE, {
  [Types.SET_LOGIN]: setLogin,
  [Types.SET_LOGOUT]: setLogout,
});

export default {
  Types,
  Creators,
};
