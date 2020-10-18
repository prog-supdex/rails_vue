import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import user from './modules/user';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    message: 'New Message Vuex Store'
  },
  mutations: {
    CHANGE_MESSAGE: (state, payload) => {
      state.message = payload
    }
  },
  modules: {
    user,
  },
  plugins: [createPersistedState()]
})
