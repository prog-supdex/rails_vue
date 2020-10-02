<template lang="pug">
    layout
        template(v-slot:content)
            div
                client-form
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
  import clientForm from "./client_form";
  import axios from "axios";
  import layout from "../layout";

  export default {
    name: 'client-list',
    components: {
      clientForm,
      layout
    },
    data: function() {
        return {
          clients: [],
          content: 'client-list'
        }
    },
    created() {
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
