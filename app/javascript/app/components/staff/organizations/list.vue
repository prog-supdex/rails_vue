<template lang="pug">
  div.q-pa-md
    q-table(
      :title="$t('common.organizations')"
      :data="organizations"
      :columns="columns"
      :pagination.sync="pagination"
      row-key="id"
      :loading="loading"
      color="amber"
      binary-state-sort
      :filter="filter"
      @request="onRequest"
      v-on:reload-org-list-event="onRequest"
    )
      template(v-slot:top-left)
        q-btn(dense color="secondary" label="Создать организацию" @click="showPage('new')" no-caps)
      template(v-slot:top-right)
        q-input(borderless dense debounce="300" v-model="filter" placeholder="Поиск" bg-color="white")
          template(v-slot:append)
            q-icon(name="search")

      template(v-slot:body-cell-actions="props")
        q-td(:props="props")
          q-btn(color="blue" :label="$t('common.edit')" @click="showPage(props.row.id)" size=sm no-caps)
          q-btn(color="red" :label="$t('common.delete')"  @click="deleteOrgRecord(props.row)" size=sm no-caps)
      template(v-slot:loading)
        q-inner-loading(showing)
          q-spinner-cube(color="orange" size="5.5em")
      template(v-slot:no-data)
        q-icon.text-red(name="warning" style="font-size: 2rem;")
        span Ничего не найдено

    router-view
</template>

<script>
export default {
  name: 'organization-list',
  data: () => ({
    pagination: {
      sortBy: 'created_at',
      descending: true,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0,
    },
    columns: [
      {
        name: 'name', label: 'Название', align: 'left', field: 'name', sortable: true,
      },
      {
        name: 'org_type', align: 'center', label: 'Тип', field: 'org_type',
      },
      {
        name: 'inn', align: 'center', label: 'ИНН', field: 'inn', sortable: true,
      },
      {
        name: 'ogrn', align: 'center', label: 'ОГРН', field: 'ogrn', sortable: true,
      },
      {
        name: 'actions',
        label: 'Actions',
        field: 'actions',
      },
    ],
    organizations: [],
    loading: true,
    filter: '',
  }),
  mounted() {
    this.onRequest({
      pagination: this.pagination,
      filter: undefined,
    });

    this.$cable.subscribe({
      channel: 'OrganizationsChannel',
      room: 'public',
    });
  },
  methods: {
    onRequest(props) {
      const {
        page, sortBy, descending, rowsPerPage,
      } = props.pagination;
      const { filter } = props;
      this.loading = true;

      this.$api.staffs.organizations.index({
        filter, sort_field: sortBy, page, desc: descending, per_page: rowsPerPage,
      })
        .then(({ data }) => {
          this.organizations = data.organizations;
          this.loading = false;
          this.pagination.rowsNumber = data.pagy.count;
          this.pagination.rowsPerPage = data.pagy.vars.items;
          this.pagination.page = data.pagy.page;
          this.pagination.sortBy = data.sort.field;
          this.pagination.descending = data.sort.desc;
        });
    },
    showPage(id) {
      this.$router.push({ name: 'staff_organization_form', params: { id } });
    },
    deleteOrgRecord(orgObject) {
      // eslint-disable-next-line no-restricted-globals
      if (confirm(`Вы уверены, что хотите удалить организацию ${orgObject.name} ?`)) {
        this.$api.staffs.organizations.delete(orgObject.id);
      }
    },
  },
  channels: {
    OrganizationsChannel: {
      received(data) {
        if (data.organization) {
          // eslint-disable-next-line no-restricted-syntax
          for (const i in Object.keys(this.organizations)) {
            if (this.organizations[i].id === data.organization.id) {
              if (data.destroyed) {
                this.organizations.splice(i, 1);
              } else {
                // eslint-disable-next-line guard-for-in,no-restricted-syntax
                for (const key in data.organization) {
                  this.organizations[i][key] = data.organization[key];
                }
              }

              return;
            }
          }

          this.organizations.push(data.organization);
        }
      },
    },
  },
};
</script>
