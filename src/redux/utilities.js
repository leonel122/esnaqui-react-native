import produce from 'immer';

export const setValue = (k1) => (state, payload) => {
  return produce(state, (draftState) => {
    draftState[k1] = payload[k1];
  });
};

export const delValue = (k1, df) => (state) => {
  return produce(state, (draftState) => {
    draftState[k1] = df;
  });
};

export const setList = (k1, k2 = 'id') => (state, payload) => {
  return produce(state, (draftState) => {
    draftState[k1] = {};
    for (let i = 0; i < payload[k1].length; i++) {
      draftState[k1][payload[k1][i][k2]] = payload[k1][i];
    }
  });
};

export const addList = (k1, k2 = 'id') => (state, payload) => {
  return produce(state, (draftState) => {
    // draftState[k1] = {};
    for (let i = 0; i < payload[k1].length; i++) {
      draftState[k1][payload[k1][i][k2]] = payload[k1][i];
    }
  });
};

export const delList = (k1, k2 = 'id') => (state, payload) => {
  return produce(state, (draftState) => {
    for (let i = 0; i < payload[k1].length; i++) {
      delete draftState[k1][payload[k1][i][k2]];
    }
  });
};

export const reset = (INITIAL_STATE) => (state) =>
  produce(state, (draftState) => {
    Object.assign(draftState, INITIAL_STATE);
  });
