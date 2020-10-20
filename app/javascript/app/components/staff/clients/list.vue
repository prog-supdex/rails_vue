<template lang="pug">
  div.q-pa-md
    q-table(
      title="Клиенты"
      :data="clients"
      :columns="columns"
      :pagination.sync="pagination"
      row-key="name"
      dark
      color="amber",
      :loading="loading"
      binary-state-sort
      @request="onRequest"
      class="relative-position"
      v-on:reload-client-list-event="onRequest"
    )
      template(v-slot:top)
        q-btn(dense color="secondary" label="Создать клиента" @click="showPage('new')" no-caps)

      template(v-slot:body-cell-actions="props")
        q-td(:props="props")
          q-btn(color="blue" label="Редактировать" @click="showPage(props.row.id)" size=sm no-caps)
          q-btn(color="yellow" label="Сбросить пароль" @click="resetPassword(props.row.id)" size=sm no-caps)
          q-btn(color="red" label="Удалить"  @click="deleteRecord(props.row)" size=sm no-caps)
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
  name: 'client-list',
  data() {
    return {
      pagination: {
        sortBy: 'created_at',
        descending: true,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
      },
      filter: '',
      clients: [],
      loading: true,
      content: 'client-list',
      columns: [
        {
          required: true, label: 'Имя', align: 'left', field: 'name', sortable: true,
        },
        {
          align: 'center', label: 'Email', field: 'email', sortable: true,
        },
        {
          label: 'Телефон', field: 'phone', sortable: true, align: 'center',
        },
        {
          name: 'actions',
          label: 'Actions',
          field: 'actions',
        },
      ],
    };
  },
  mounted() {
    this.onRequest({
      pagination: this.pagination,
      filter: undefined,
    });
  },
  methods: {
    onRequest(props) {
      this.loading = true;
      console.log(props);
      this.$api.staffs.clients.index({ page: props.pagination.page, per_page: props.pagination.rowsPerPage })
        .then(({ data }) => {
          this.clients = data.clients;
          this.loading = false;
          this.pagination.rowsNumber = data.pagy.count;
          this.pagination.rowsPerPage = data.pagy.vars.items;
          this.pagination.page = data.pagy.page;
        });
    },
    deleteRecord(clientObject) {
      // eslint-disable-next-line no-restricted-globals
      if (confirm(`Вы уверены, что хотите удалить организацию ${clientObject.name} ?`)) {
        this.$api.staffs.clients.delete(clientObject.id);
      }
    },
    showPage(id) {
      this.$router.push({ name: 'staff_client_form', params: { id } });
    },
    resetPassword(id) {
      this.$router.push({ name: 'reset_password_form', params: { id, type: 'client' } });
    },
  },
};
</script>
