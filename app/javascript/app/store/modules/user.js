import '../../api/index'
import Vue from "vue";

const state = {
  currentUser: null,
  userSignedIn: null
};

const getters = {
  currentUser: state => {
    return state.currentUser
  }
};

const mutations = {
  SET_CURRENT_USER: (state, userObject) => {
    state.currentUser = userObject
    state.userSignedIn = true
  }
};

const actions = {
  currentUser: async (context, payload) => {
    return Vue.prototype.$api.users.current_user()
      .then(({data}) => {
        context.commit('SET_CURRENT_USER', data)
      })
  },
};

export default {
  state,
  getters,
  mutations,
  actions
}
