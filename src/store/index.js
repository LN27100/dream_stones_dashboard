import { createStore } from 'vuex';

export default createStore({
  state: {
    adminAdded: false,
  },
  mutations: {
    setAdminAdded(state, value) {
      state.adminAdded = value;
    },
  },
  actions: {
  },
  modules: {
  }
});
