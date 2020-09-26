<template lang="pug">
    div.client-list
        table
            thead
                tr
                    th id
                    th Имя
                    th Email
                    th Телефон
            tr(v-for="client in clients" :key="client.id")
                td.id {{ client.id }}
                td.name {{ client.name }}
                td.email {{ client.email }}
                td.phone {{ client.phone }}
</template>

<script>
  const axios = require('axios');

  export default {
    data: function() {
        return {
          clients: []
        }
    },
    created() {
      this.$root.$on('client-list-update-component', () => {
        this.fetchClients()
      });

      this.fetchClients();
    },
    methods: {
      fetchClients: function () {
        axios.get('/staffs/clients')
          .then(({data}) => {
            this.clients = data
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
</script>

<style scoped lang="scss">
    .client-list {
        margin-top: 40px;

        table {
            width: 650px;
        }
    }
</style>
