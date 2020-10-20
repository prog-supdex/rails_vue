<template lang="pug">
  q-tabs(align="left")
    div(v-if="currentUser")
      span Вошли как {{ currentUser.name }} ({{ currentUser.email }})</span>
      q-btn(color="white" text-color="black" @click="signOut" label="Выйти")

    q-route-tab(
      icon="apartment"
      label="Организации"
      to="/clients/organizations"
      exact
    )
</template>

<script>
export default {
  name: 'NavbarLayout',
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
  },
  methods: {
    signOut() {
      this.$api.clients.sign_out().then(() => {
        this.$store.commit('SET_CURRENT_USER', null);
        this.$router.push({ name: 'clients_sign_in' });
      });
    },
  },
};
</script>
