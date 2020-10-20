<template lang="pug">
  div
    q-dialog(v-model="showDialog" title="Создание оборудования" persistent @hide="pushToEquipments")
      q-card(style="width: 750px; max-width: 85vw;")
        q-form.justify-center.q-pa-lg(@submit="checkForm" @reset.prevent.stop="onReset")
          q-input(
            ref="name"
            v-model="equip.name"
            label="Название"
            filled
            placeholder="Название оборудования"
            lazy-rules
            :rules="[\
              val => val !== '' || 'Укажите название',\
              val => val.length >= 5 || 'Название должно содержать не меньше 5 символов'\
            ]"
          )
          br
          q-input(
            ref="serial_number"
            v-model="equip.serial_number"
            label="Серийный номер"
            filled
            placeholder="Серийный номер"
            lazy-rules
            :rules="[\
              val => val !== '' || 'Укажите серийный номер',\
              existsEquipBySerialNumber\
            ]"
          )
          br
          q-select(
            filled
            v-model="equip.organization_id"
            :options="organizations"
            map-options
            stack-label
            use-input
            use-chips
            emit-value
            option-value="id"
            option-label="name"
            label="Организации"
          )
          br
          q-select(
            ref="equipment_type"
            filled
            emit-value
            map-options
            option-value="id"
            option-label="name"
            v-model="equip.equipment_type"
            :options="options"
            label="Тип оборудования"
            :rules="[val => !!val || 'Обязательное поле']"
          )
          br
          div
            q-btn(:label="equipId ? $t('common.update') : $t('common.create')" type="submit" color="primary")
            q-btn.q-ml-sm(v-if="equipId == ''" label="Сбросить" type="reset" color="primary" flat)
            q-btn.q-ml-sm(v-else :label="$t('common.delete')" @click="deleteRecord(equip)" color="primary" flat)
            q-btn(v-close-popup :label="$t('common.close')" color="secondary")
</template>

<script>
import fetchOrganizations from '../../mixins/fetchOrganizations';

export default {
  name: 'equip-form',
  mixins: [fetchOrganizations],
  data() {
    return {
      equip: {
        name: '',
        equipment_type: '',
        serial_number: '',
        organization_id: '',
      },
      equipId: '',
      organizations: [],
      showDialog: false,
      options: [{ id: 'primary', name: 'Первичное' }, { id: 'secondary', name: 'Вторичное' }],
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  created() {
    if (this.id && this.id !== 'new') {
      this.$api.staffs.equipments.show(this.id).then(({ data }) => {
        this.equip = { ...data };
        this.equipId = this.id;
      });
    }
    this.showDialog = true;
  },
  methods: {
    checkForm() {
      this.$refs.name.validate();
      this.$refs.equipment_type.validate();
      this.$refs.serial_number.validate();

      if (this.$refs.name.hasError || this.$refs.equipment_type.hasError || this.$refs.serial_number.hasError) {
        this.formHasError = true;
      } else {
        this.onSubmit();
      }
    },
    onSubmit() {
      const params = { equipment: this.equip };
      let scope = this.$api.staffs.equipments;
      scope = this.equipId ? scope.update(this.equipId, params) : scope.create(params);

      scope
        .then(({ data }) => {
          if (data.success) {
            this.onReset();
            this.showDialog = false;
            this.$emit('reload-equip-list-event');
          }
        });
    },
    onReset() {
      Object.keys(this.equip).forEach((field) => {
        this[field] = '';
      });

      this.$refs.name.resetValidation();
      this.$refs.equipment_type.resetValidation();
      this.$refs.serial_number.resetValidation();
    },
    existsEquipBySerialNumber(val) {
      if (this.equipId) {
        return true;
      }

      return new Promise((resolve) => {
        this.$api.staffs.equipments.exists({
          value: val,
        })
          .then(({ data }) => {
            resolve(!data || 'Такой серийный номер уже присутствует в базе');
          });
      });
    },
    deleteRecord(equipObject) {
      // eslint-disable-next-line no-restricted-globals
      if (confirm(`Вы уверены, что хотите удалить оборудование ${equipObject.name} ?`)) {
        this.$api.staffs.equipments.delete(equipObject.id)
          .then(() => {
            this.showDialog = false;
            this.$emit('reload-equip-list-event');
          });
      }
    },
    pushToEquipments() {
      this.$router.push({ name: 'staff_equipments' });
    },
  },
};
</script>
