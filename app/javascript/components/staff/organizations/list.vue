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
        )
            template(v-slot:top)
                q-btn(dense color="secondary" label="Создать организацию" @click="openOrgForm(null)" no-caps)

            template(v-slot:body-cell-actions="props")
                q-td(:props="props")
                    q-btn(color="blue" label="Редактировать" @click="openOrgForm(props.row.id)" size=sm no-caps)
                    q-btn(color="red" label="Удалить"  @click="deleteOrgRecord(props.row)" size=sm no-caps)
            template(v-slot:loading)
                q-inner-loading(showing)
                    q-spinner-cube(color="orange" size="5.5em")
</template>

<script>
  import {fetchOrganizations} from "../../mixins/fetchOrganizations";

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
      openOrgForm: function(orgId) {
        this.$emit('open-org-form-event', orgId);
      },
      deleteOrgRecord: function(orgObject) {
        this.$emit('delete-org-event', orgObject);
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
