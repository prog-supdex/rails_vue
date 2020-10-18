import '../../api/index'
import Vue from "vue";

const state = {
  organizations: null
};

const getters = {
  organizations: state => {
    return state.organizations
  }
};

const mutations = {
  SET_ORGANIZATIONS: (state, payload) => {
    state.organizations = payload
  },
  ADD_ORGANIZATION: (state, payload) => {
    state.organizations.push(payload)
  }
};

const actions = {
  GET_ORGANIZATIONS: (state, payload) => {

  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
