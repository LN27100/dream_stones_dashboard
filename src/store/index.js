// Importation de la fonction createStore de Vuex pour créer le store
import { createStore } from 'vuex';

export default createStore({
    // Définition de l'état initial du store
  state: {
        // Variable pour suivre si un administrateur a été ajouté
    adminAdded: false,
  },
    // Définition des mutations pour modifier l'état du store de manière synchrone
  mutations: {
    setAdminAdded(state, value) {
      state.adminAdded = value;
    },
  }
});
