import '../../api/index';
import Vue from 'vue';

// TODO реализовать нормальную авторизацию через JWT + его проверку
const state = {
  currentUser: null,
};

const getters = {
  currentUser: (st) => st.currentUser,
};

const mutations = {
  SET_CURRENT_USER: (st, userObject) => {
    // eslint-disable-next-line no-param-reassign
    st.currentUser = userObject;
    // eslint-disable-next-line no-param-reassign
    st.userSignedIn = true;
  },
};

const actions = {
  currentUser: async (context) => Vue.prototype.$api.users.current_user()
    .then(({ data }) => {
      context.commit('SET_CURRENT_USER', data);
    }),
};

export default {
  state,
  getters,
  mutations,
  actions,
};
