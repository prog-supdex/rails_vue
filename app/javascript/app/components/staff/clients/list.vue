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
      binary-state-sort
      class="relative-position"
    )
      template(v-slot:top)
        q-btn(dense color="secondary" label="Создать клиента" @click="showPage('new')" no-caps)

      template(v-slot:body-cell-actions="props")
        q-td(:props="props")
          q-btn(color="blue" label="Редактировать" @click="showPage(props.row.id)" size=sm no-caps)
          q-btn(color="red" label="Удалить"  @click="deleteRecord(props.row)" size=sm no-caps)
      template(v-slot:loading)
        q-inner-loading(showing)
          q-spinner-cube(color="orange" size="5.5em")
    router-view
</template>

<script>
  import { fetchClients } from "../../mixins/fetchClients";

  export default {
    name: 'client-list',
    mixins: [fetchClients],
    data: function() {
      return {
        clients: [],
        loading: true,
        content: 'client-list',
        columns: [
          { required: true, label: 'Имя', align: 'left', field: 'name', sortable: true },
          { align: 'center', label: 'Email', field: 'email', sortable: true },
          { label: 'Телефон', field: 'phone', sortable: true, align: 'center' },
          {
            name: 'actions',
            label: 'Actions',
            field: 'actions'
          }
        ]
      }
    },
    methods: {
      deleteRecord: function(clientObject) {
        this.$emit('delete-client-event', clientObject);
      },
      showPage: function(id) {
        this.$router.push({ name: 'staff_client_form', params: { id }  })
      },
      // showPage: function(id) {
      //   this.$router.push({ name: 'staff_client_form', params: { id } })
      //   this.$router.push({ name: 'staff_organization_form', params: { id } })
      // }
    }
  }
</script>
