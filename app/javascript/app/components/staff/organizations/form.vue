<template lang="pug">
  div
    q-dialog(v-model="showDialog" title="Создание организации" persistent @hide="pushToOrganizations")
      q-card(style="width: 750px; max-width: 85vw;")
        q-form.justify-center.q-pa-lg(@submit="checkForm" @reset.prevent.stop="onReset")
          q-input(
            ref="name"
            v-model="organization.name"
            label="Имя"
            filled
            placeholder="Название организации"
            lazy-rules
            :rules="[\
              val => val !== '' || 'Укажите имя',\
            ]"
          )
          br
          q-select(
            ref="org_type"
            filled
            emit-value
            map-options
            option-value="id"
            option-label="name"
            v-model="organization.org_type"
            :options="options"
            label="Тип организации"
            :rules="[val => !!val || 'Обязательное поле']"
          )
          br
          q-select(
            v-if="orgId"
            filled
            v-model="organization.client_list_id"
            :options="clients"
            map-options
            emit-value
            option-value="id"
            option-label="name"
            multiple
            label="Клиенты организации"
          )
          br
          q-select(
            v-if="orgId"
            filled
            v-model="organization.equipment_list_id"
            :options="equipments"
            map-options
            emit-value
            option-value="id"
            option-label="name"
            multiple
            label="Оборудования"
          )
          br
          q-input(
            ref="inn"
            v-model="organization.inn"
            label="ИНН"
            filled
            placeholder="ИНН организации"
            lazy-rules
            :rules="[\
              val => val !== '' || 'Укажите ИНН',\
            ]"
          )
          br
          q-input(
            ref="ogrn"
            v-model="organization.ogrn"
            label="ОГРН"
            filled
            placeholder="ОГРН организации"
            lazy-rules
            :rules="[\
              val => val !== '' || 'Укажите ОГРН',\
            ]"
          )
          br
          div
            q-btn(:label="orgId ? $t('common.update') : $t('common.create')" type="submit" color="primary")
            q-btn.q-ml-sm(v-if="orgId == ''" label="Сбросить" type="reset" color="primary" flat)
            q-btn.q-ml-sm(v-else :label="$t('common.delete')" @click="deleteRecord(organization)" color="primary" flat)
            q-btn(v-close-popup :label="$t('common.close')" color="secondary")
</template>

<script>
import fetchClients from '../../mixins/fetchClients';

export default {
  name: 'organization-form',
  mixins: [fetchClients],
  data() {
    return {
      organization: {
        name: '',
        org_type: '',
        inn: '',
        ogrn: '',
        client_list_id: [],
        equipment_list_id: [],
      },
      clients: [],
      equipments: [],
      orgId: '',
      showDialog: false,
      options: [{ id: 'individual', name: 'ИП' }, { id: 'juridical', name: 'Юр. Лицо' }],
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  created() {
    if (this.id && this.id !== 'new') {
      this.$api.staffs.organizations.show(this.id).then(({ data }) => {
        this.organization = { ...data };
        this.orgId = this.id;
      });
    }
    this.showDialog = true;
    this.$api.staffs.equipments.free_equipments().then(({ data }) => {
      this.equipments = data;
    });
  },
  methods: {
    checkForm() {
      this.$refs.name.validate();
      this.$refs.inn.validate();
      this.$refs.ogrn.validate();
      this.$refs.org_type.validate();

      if (this.$refs.name.hasError
          || this.$refs.inn.hasError
          || this.$refs.ogrn.hasError
          || this.$refs.org_type.hasError) {
        this.formHasError = true;
      } else {
        this.onSubmit();
      }
    },
    onSubmit() {
      const params = { organization: this.organization };
      let scope = this.$api.staffs.organizations;
      scope = this.orgId ? scope.update(this.orgId, params) : scope.create(params);

      scope
        .then(({ data }) => {
          if (data.success) {
            this.onReset();
            this.showDialog = false;
            this.$emit('reload-org-list-event');
          }
        });
    },
    onReset() {
      this.organization.name = '';
      this.organization.org_type = '';
      this.organization.ogrn = '';
      this.organization.inn = '';
      this.organization.client_list_id = [];

      this.$refs.name.resetValidation();
      this.$refs.ogrn.resetValidation();
      this.$refs.inn.resetValidation();
      this.$refs.org_type.resetValidation();
    },
    deleteRecord(orgObject) {
      // eslint-disable-next-line no-restricted-globals
      if (confirm(`Вы уверены, что хотите удалить организацию ${orgObject.name} ?`)) {
        this.$api.staffs.organizations.delete(orgObject.id).then(() => {
          this.showDialog = false;
          this.$emit('reload-org-list-event');
        });
      }
    },
    pushToOrganizations() {
      this.$router.push({ name: 'staff_organizations' });
    },
  },
};
</script>
