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
        .row
          .col-12.search-block
            q-input(v-model="searchString" name="search-string" bg-color="white" class="inline search-label vertical-middle" type="search")
              template(v-slot:append)
                q-icon(name="search")

            q-btn(dense color="secondary" class="inline" label="Найти" @click="fetchOrganizations")
          .col-12
            q-btn(dense color="secondary" label="Создать организацию" @click="showPage('new')" no-caps)

      template(v-slot:body-cell-actions="props")
        q-td(:props="props")
          q-btn(color="blue" label="Редактировать" @click="showPage(props.row.id)" size=sm no-caps)
          q-btn(color="red" label="Удалить"  @click="deleteOrgRecord(props.row)" size=sm no-caps)
      template(v-slot:loading)
        q-inner-loading(showing)
          q-spinner-cube(color="orange" size="5.5em")
      template(v-slot:no-data)
        q-icon(name="warning" class="text-red" style="font-size: 2rem;")
        span Ничего не найдено
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

<style lang="scss">
  .search-block {
    margin-bottom: 10px;

    .search-label {
      .q-field__control, .q-field__marginal {
        height: 30px;
      }

      input {
        padding-left: 10px;
      }
    }
  }
</style>
