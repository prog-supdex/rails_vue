<template lang="pug">
    q-tabs(align="left")
      div(v-if="current_user")
        span Вошли как {{ current_user.name }} ({{ current_user.email }})</span>
        q-btn(color="white" text-color="black" @click="signOut" label="Выйти")

      q-route-tab(
        icon="wc"
        label="Клиенты"
        to="/staffs/clients"
        exact
      )
      q-route-tab(
        icon="build"
        label="Оборудования"
        to="/staffs/equipments"
        exact
      )
      q-route-tab(
        icon="apartment"
        label="Организации"
        to="/staffs/organizations"
        exact
      )
</template>

<script>
  import { currentUser } from '../../mixins/currentUser'

  export default {
    name: 'NavbarLayout',
    mixins: [currentUser],
    created() {
      this.fetchCurrentUser('staffs');
    },
    methods: {
      signOut() {
        this.$api.staffs.sign_out().then(_ => {
          this.$router.push({ name: 'staffs_sign_in' })
        })
      }
    }
  }
</script>
