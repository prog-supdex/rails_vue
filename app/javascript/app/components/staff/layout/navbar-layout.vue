<template lang="pug">
    q-tabs(align="left")
      div(v-if="currentUser")
        span Вошли как {{ currentUser.name }} ({{ currentUser.email }})</span>
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
  export default {
    name: 'NavbarLayout',
    computed: {
      currentUser () {
        return this.$store.getters.currentUser
      }
    },
    methods: {
      signOut() {
        this.$api.staffs.sign_out().then(_ => {
          this.$store.commit('SET_CURRENT_USER', null)
          this.$router.push({ name: 'staffs_sign_in' })
        })
      }
    }
  }
</script>
