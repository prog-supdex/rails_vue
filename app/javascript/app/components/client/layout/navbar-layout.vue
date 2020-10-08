<template lang="pug">
  q-tabs(align="left")
    div(v-if="current_user")
      span Вошли как {{ current_user.name }} ({{ current_user.email }})</span>
      q-btn(color="white" text-color="black" @click="signOut" label="Выйти")

    q-route-tab(
      icon="apartment"
      label="Организации"
      to="/clients/organizations"
      exact
    )
</template>

<script>
  import { currentUser } from '../../mixins/currentUser'

  export default {
    name: 'NavbarLayout',
    mixins: [currentUser],
    created: function() {
      this.fetchCurrentUser('clients');
    },
    methods: {
      signOut() {
        this.$api.clients.sign_out()
      }
    }
  }
</script>
