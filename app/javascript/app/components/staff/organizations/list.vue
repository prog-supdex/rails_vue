<template lang="pug">
  div(class="q-pa-md")
    q-table(
      title="Организации"
      :data="organizations"
      :columns="columns"
      row-key="name"
      dark
      :loading="loading"
      color="amber"
      binary-state-sort
      v-on:reload-org-list-event="fetchOrganizations"
    )
      template(v-slot:top)
        q-btn(dense color="secondary" label="Создать организацию" @click="showPage('new')" no-caps)

      template(v-slot:body-cell-actions="props")
        q-td(:props="props")
          q-btn(color="blue" label="Редактировать" @click="showPage(props.row.id)" size=sm no-caps)
          q-btn(color="red" label="Удалить"  @click="deleteOrgRecord(props.row)" size=sm no-caps)
      template(v-slot:loading)
        q-inner-loading(showing)
          q-spinner-cube(color="orange" size="5.5em")
    router-view
</template>

<script>
  import { fetchOrganizations } from '../../mixins/fetchOrganizations'

  export default {
    name: 'organization-list',
    mixins: [fetchOrganizations],
    data: function() {
      return {
        columns: [
          { name: 'name', label: 'Название', align: 'left', field: 'name' },
          { name: 'org_type', align: 'center', label: 'Тип', field: 'org_type' },
          { name: 'inn', align: 'center', label: 'ИНН', field: 'inn' },
          { name: 'ogrn', align: 'center', label: 'ОГРН', field: 'ogrn' },
          {
            name: 'actions',
            label: 'Actions',
            field: 'actions'
          }
        ],
        organizations: []
      }
    },
    methods: {
      showPage: function(id) {
        this.$router.push({ name: 'staff_organization_form', params: { id }  })
      },
      deleteOrgRecord: function(orgObject) {
        this.$emit('delete-org-event', orgObject);
      }
    }
  }
</script>
