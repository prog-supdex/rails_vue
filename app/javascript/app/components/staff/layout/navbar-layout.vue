<template lang="pug">
    q-tabs(align="left")
        div(v-if="current_user")
            span Вошли как {{ current_user.name }} ({{ current_user.email }})</span>
            a(href="/staffs/sign_out" class="white") Выйти

</template>

<script>

  import axios from "axios";

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
        axios.get('/users/current_user')
          .then(({data}) => {
            this.current_user = data
          })
      }
    }
  }
</script>
