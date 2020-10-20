<template lang="pug">
  div
    q-dialog(v-model="showDialog" title="Создание клиента" persistent @hide="pushToClients")
      q-card(style="width: 750px; max-width: 85vw;")
        q-form.justify-center.q-pa-lg(@submit="checkForm" @reset.prevent.stop="onReset")
          q-input(
            ref="name"
            v-model="client.name"
            label="Имя"
            filled
            placeholder="Имя клиента"
            lazy-rules
            :rules="[\
              val => val !== '' || 'Укажите имя',\
              val => val.length >= 5 || 'Имя должно содержать не меньше 5 символов'\
            ]"
          )
          br
          q-input(
            ref="email"
            v-model="client.email"
            label="Email"
            filled
            placeholder="Email клиента"
            lazy-rules
            :rules="[\
              val => val !== '' || 'Укажите email',\
              emailCheck,\
              existsClientByEmail\
            ]"
          )
          br
          q-select(
            v-if="clientId"
            filled
            v-model="client.organization_list_id"
            :options="organizations"
            map-options
            stack-label
            use-input
            use-chips
            emit-value
            multiple
            option-value="id"
            option-label="name"
            label="Организации"
          )
          br
          q-input(
            ref="phone"
            v-model="client.phone"
            label="Телефон"
            filled
            mask="# (###) ### - ## - ##"
            unmasked-value
            placeholder="Телефон клиента"
            lazy-rules
            :rules="[\
              val => val !== '' || 'Укажите телефон',\
              phoneCheck,\
              existsClientByPhone\
            ]"
          )
          br
          q-input(
            v-if="clientId == ''"
            ref="password"
            v-model="client.password"
            label="Пароль"
            placeholder="Пароль клиента"
            filled
            lazy-rules
            :rules="[\
              val => val !== '' || 'Укажите пароль',\
              val => val.length >= 8 || 'Пароль не может содержать меньше 8 символов'\
            ]"
          )
          br
          div
            q-btn(:label="clientId ? 'Обновить' : 'Создать'" type="submit" color="primary")
            q-btn.q-ml-sm(v-if="clientId == ''" label="Сбросить" type="reset" color="primary" flat)
            q-btn.q-ml-sm(v-else label="Удалить" @click="deleteRecord(client)" color="primary" flat)
            q-btn.q-ml-sm(label="Сбросить пароль" @click="reset_password_form(client)" color="primary" flat)
            q-btn(v-close-popup label="Закрыть" color="secondary")
</template>


<script>
  import { fetchOrganizations } from '../../mixins/fetchOrganizations'

  export default {
    name: 'client-form',
    mixins: [fetchOrganizations],
    data() {
      return {
        client: {
          email: '',
          password: '',
          name: '',
          phone: '',
          organization_list_id: []
        },
        clientId: '',
        organizations: [],
        showDialog: false,
      }
    },
    computed: {
      id() {
        return this.$route.params.id;
      }
    },
    created() {
      if (this.id && this.id != 'new') {
        this.$api.staffs.clients.show(this.id).then(({data}) => {
          this.client = Object.assign({}, data);
          this.clientId = this.id;
        })
      }
      this.showDialog = true;
    },
    methods: {
      checkForm() {
        this.$refs.email.validate();
        this.$refs.name.validate();
        this.$refs.phone.validate();

        var passwordError = null

        if (!this.clientId) {
          passwordError =this.$refs.password.hasError
          this.$refs.password.validate();
        }

        if (this.$refs.email.hasError || passwordError || this.$refs.phone.hasError || this.$refs.name.hasError) {
          this.formHasError = true
        } else {
          this.onSubmit();
        }
      },
      emailCheck: function(val) {
        const emailCheck = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return emailCheck.test(val) || 'Неверный формат'
      },
      phoneCheck: function(val) {
        return !(/^\d+$/.test(this.phone)) || 'Неверный формат'
      },
      onSubmit() {
        let params = { client: this.client }
        let scope = this.$api.staffs.clients
        scope = this.clientId ? scope.update(this.clientId, params) : scope.create(params)

        scope.then(({data}) => {
          if (data.success) {
            this.onReset();
            this.showDialog = false;
            this.$emit('reload-client-list-event')
          }
        })
      },
      onReset () {
        this.name = '';
        this.email = '';
        this.password = '';
        this.phone = '';

        this.$refs.name.resetValidation();
        this.$refs.email.resetValidation();

        if (!this.clientId) {
          this.$refs.password.resetValidation();
        }

        this.$refs.phone.resetValidation();
      },
      existsClientByPhone: function(val) {
        if (this.clientId) {
          return true;
        }

        return this.existsClientByField('phone', val);
      },
      existsClientByEmail: function(val) {
        if (this.clientId) {
          return true;
        }

        return this.existsClientByField('email', val);
      },
      existsClientByField: function(field, value) {
        return new Promise((resolve, _) => {
          this.$api.staffs.clients.exists({
            field: field,
            value: value
          })
            .then(({data}) => {
              if (field == 'phone') {
                resolve(!data || 'Такой телефон уже присутствует в базе')
              } else {
                resolve(!data || 'Такой email уже присутствует в базе')
              }
          })
        })
      },
      deleteRecord: function(clientObject) {
        if (confirm(`Вы уверены, что хотите удалить клиента ${clientObject.name} ?`)) {
          this.$api.staffs.clients.delete(clientObject.id)
            .then(_ => {
              this.showDialog = false
              this.$emit('reload-client-list-event');
            })
        }
      },
      resetPasswordForm: function(id) {
        this.$router.push({ name: 'staff_clients', params: { id: id, type: 'clients' } })
      },
      pushToClients() {
        this.$router.push({ name: 'staff_clients' })
      }
    }
  }
</script>
