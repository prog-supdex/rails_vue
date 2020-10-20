<template lang="pug">
  div.q-pa-md
    q-table(
      title="Организации"
      :data="organizations"
      :columns="columns"
      row-key="name"
      dark
      color="amber"
      :loading="loading"
    )
      template(v-slot:loading)
        q-inner-loading(showing)
          q-spinner-cube(color="orange" size="5.5em")
</template>

<script>
export default {
  name: 'organization-client-list',
  data() {
    return {
      loading: true,
      organizations: [],
      content: 'client-list',
      columns: [
        {
          name: 'name', required: true, label: 'Название', align: 'left', field: 'name', sortable: true,
        },
        {
          name: 'org_type', align: 'center', label: 'Тип', field: 'org_type', sortable: true,
        },
        {
          name: 'inn', label: 'ИНН', field: 'inn', sortable: true,
        },
        {
          name: 'ogrn', label: 'ОГРН', field: 'ogrn', sortable: true,
        },
      ],
    };
  },
  created() {
    this.fetchOrganizations();
  },
  methods: {
    fetchOrganizations() {
      this.$api.clients.organizations.index()
        .then(({ data }) => {
          this.loading = false;
          this.organizations = data;
        });
    },
  },
};
</script>
