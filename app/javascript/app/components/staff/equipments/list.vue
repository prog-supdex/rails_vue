<template lang="pug">
  div.q-pa-md
    q-table(
      :title="$t('common.equipments')"
      :data="equipments"
      :columns="columns"
      row-key="name"
      dark
      color="amber",
      :loading="loading"
      binary-state-sort
      class="relative-position"
      v-on:reload-equip-list-event="fetchEquipments"
    )
      template(v-slot:top)
        q-btn(dense color="secondary" label="Создать оборудование" @click="showPage('new')" no-caps)

      template(v-slot:body-cell-actions="props")
        q-td(:props="props")
          q-btn(color="blue" :label="$t('common.edit')" @click="showPage(props.row.id)" size=sm no-caps)
      template(v-slot:loading)
        q-inner-loading(showing)
          q-spinner-cube(color="orange" size="5.5em")
    router-view
</template>

<script>
export default {
  name: 'equipment-list',
  data() {
    return {
      equipments: [],
      loading: true,
      columns: [
        {
          required: true, label: 'Название', align: 'left', field: 'name', sortable: true,
        },
        {
          align: 'center', label: 'Серийный номер', field: 'serial_number', sortable: true,
        },
        {
          label: 'Тип', field: 'equipment_type', sortable: true, align: 'center',
        },
        {
          name: 'actions',
          label: 'Actions',
          field: 'actions',
        },
      ],
    };
  },
  created() {
    this.fetchEquipments();
  },
  methods: {
    fetchEquipments() {
      this.$api.staffs.equipments.index().then(({ data }) => {
        this.equipments = data;
        this.loading = false;
      });
    },
    showPage(id) {
      this.$router.push({ name: 'staff_equipment_form', params: { id } });
    },
  },
};
</script>
