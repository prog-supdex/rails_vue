<template lang="pug">
  div
    q-dialog(v-model="showDialog" title="Создание организации" persistent)
      q-card(style="width: 750px; max-width: 85vw;")
        q-form(class="justify-center q-pa-lg" @submit="checkForm" @reset.prevent.stop="onReset")
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
            q-btn(:label="orgId ? 'Обновить' : 'Создать'" type="submit" color="primary")
            q-btn(v-if="orgId == ''" label="Сбросить" type="reset" color="primary" flat class="q-ml-sm")
            q-btn(v-else label="Удалить" @click="deleteRecord(organization)" color="primary" flat class="q-ml-sm")
            q-btn(v-close-popup label="Закрыть" color="secondary")
</template>


<script>
  import {fetchClients} from "../../mixins/fetchClients";

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
          client_list_id: []
        },
        clients: [],
        orgId: '',
        showDialog: false,
        options: [ { id: 'individual', name: 'ИП' }, { id: 'juridical', name: 'Юр. Лицо' } ]
      }
    },
    methods: {
      checkForm: function (e) {
        this.$refs.name.validate()
        this.$refs.inn.validate()
        this.$refs.ogrn.validate()
        this.$refs.org_type.validate()

        if (this.$refs.name.hasError || this.$refs.inn.hasError || this.$refs.ogrn.hasError || this.$refs.org_type.hasError) {
          this.formHasError = true
        } else {
          this.onSubmit();
        }
      },
      editForm: function(id) {
        this.$axios.get('/staffs/organizations/' + id)
          .then(({data}) => {
            this.organization = Object.assign({}, data);
            this.orgId = id
            this.showDialog = true
          })
      },
      onSubmit: function () {
        this.$axios({
          method: this.orgId ? 'patch' : 'post',
          url: '/staffs/organizations/' + this.orgId,
          data: {
            organization: this.organization
          }
        })
          .then(({data}) => {
            if (data.success) {
              this.onReset();
              this.showDialog = false;
              this.$emit('reload-org-list-event');
            }
          })
      },
      onReset () {
        this.organization.name = ''
        this.organization.org_type = ''
        this.organization.ogrn = ''
        this.organization.inn = ''
        this.organization.client_list_id = []

        this.$refs.name.resetValidation()
        this.$refs.ogrn.resetValidation()
        this.$refs.inn.resetValidation()
        this.$refs.org_type.resetValidation()
      },
      deleteRecord: function(orgObject) {
        if (confirm(`Вы уверены, что хотите удалить организацию ${orgObject.name} ?`)) {
          this.$axios.delete('/staffs/organizations/' + orgObject.id)
            .then(_ => {
              this.showDialog = false
              this.$emit('reload-org-list-event');
            })
        }
      },
      openForm: function(orgId) {
        if (!orgId) {
          this.showDialog = true
        } else {
          this.editForm(orgId)
        }
      }
    }
  }
</script>
