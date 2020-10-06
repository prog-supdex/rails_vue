<template lang="pug">
  q-tabs(align="left")
    div(v-if="current_user")
      span Вошли как {{ current_user.name }} ({{ current_user.email }})</span>
      a(href="/clients/sign_out" class="white") Выйти

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
    data: function() {
      return {
        current_user: null
      }
    },
    created: function() {
      this.fetchCurrentClientUser();
    },
    methods: {
      fetchCurrentClientUser: function () {
        this.$axios.get('/users/current_user')
          .then(({data}) => {
            this.current_user = data
          })
      }
    }
  }
</script>
