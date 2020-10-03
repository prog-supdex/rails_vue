<template lang="pug">
    div(class="q-pa-md")
        q-table(
            title="Клиенты"
            :data="clients"
            :columns="columns"
            row-key="name"
            dark
            color="amber",
            :loading="loading"
        )
</template>

<script>
  import axios from "axios";

  export default {
    name: 'client-list',
    data: function() {
      return {
        clients: [],
        content: 'client-list',
        columns: [
          { required: true, label: 'Имя', align: 'left', field: 'name', sortable: true },
          { align: 'center', label: 'Email', field: 'email', sortable: true },
          { label: 'Телефон', field: 'phone', sortable: true, align: 'center' }
        ]
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
      },
      destroyRecord: function(id) {
        axios.delete('/staffs/clients', { id: id })
          .then(({data}) => {
            this.fetchClients();
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
