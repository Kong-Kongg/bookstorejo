import Vue from 'vue';
import Vuex from 'vuex';
import cart from './modules/cart';
import user from './modules/user';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    cart,
    user,
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      reducer(data) {
        return {
          cart: data.cart,
        };
      },
    }),
  ],
});
