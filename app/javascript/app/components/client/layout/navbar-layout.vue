<template lang="pug">
  q-tabs(align="left")
    div(v-if="current_user")
      span Вошли как {{ current_user.name }} ({{ current_user.email }})</span>
      a(href="/clients/sign_out" class="white") Выйти
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
      this.fetchCurrentStaffUser();
    },
    methods: {
      fetchCurrentStaffUser: function () {
        this.$axios.get('/users/current_user')
          .then(({data}) => {
            this.current_user = data
          })
      }
    }
  }
</script>
