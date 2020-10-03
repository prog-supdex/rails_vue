<template lang="pug">
    div
        q-btn(label="Создать клиента" @click="showCreateClientDialog = !showCreateClientDialog")

        q-dialog(v-model="showCreateClientDialog" title="Создание клиента" persistent)
            q-card(style="width: 750px; max-width: 85vw;")
                q-form(action="https://some-url.com" method="post" class="justify-center q-pa-lg" @submit="checkForm" @reset.prevent.stop="onReset")
                    q-input(
                        ref="name"
                        v-model="name"
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
                        v-model="email"
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
                    q-input(
                        ref="phone"
                        v-model="phone"
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
                        ref="password"
                        v-model="password"
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
                        q-btn(label="Создать" type="submit" color="primary")
                        q-btn(label="Сбросить" type="reset" color="primary" flat class="q-ml-sm")
</template>


<script>
  import axios from "axios";

  export default {
    name: 'client-form',
    data() {
      return {
        showCreateClientDialog: false,
        email: '',
        password: '',
        name: '',
        phone: '',
      }
    },
    methods: {
      checkForm: function (e) {
        this.$refs.email.validate()
        this.$refs.password.validate()
        this.$refs.name.validate()
        this.$refs.phone.validate()

        if (this.$refs.email.hasError || this.$refs.password.hasError || this.$refs.phone.hasError || this.$refs.name.hasError) {
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
        return (/^\d+$/.test(this.phone)) || 'Неверный формат'
      },
      onSubmit: function () {
        axios.post('/staffs/clients', {
          client: {
            phone: this.phone,
            email: this.email,
            password: this.password,
            name: this.name
          }
        })
          .then(({data}) => {
            if (data.success) {
              this.$q.notify({
                icon: 'done',
                color: 'positive',
                message: "Пользователь " + data.object.name + " был создан!"
              });

              this.onReset();
              this.showCreateClientDialog = false;
              this.$emit('reload-client-list-event')
            } else {
              this.$q.notify({
                icon: 'done',
                color: 'negative',
                message: data.errors
              })
            }
            //this.$parent.fetchClients();
          })
          .catch(error => {
            console.log(error)
          })
      },
      onReset () {
        this.name = ''
        this.email = ''
        this.password = ''
        this.phone = ''

        this.$refs.name.resetValidation()
        this.$refs.email.resetValidation()
        this.$refs.password.resetValidation()
        this.$refs.phone.resetValidation()
      },
      existsClientByPhone: function(val) {
        return this.existsClientByField('phone', val);
      },
      existsClientByEmail: function(val) {
        return this.existsClientByField('email', val);
      },
      existsClientByField: function(field, value) {
        return new Promise((resolve, reject) => {
          axios.post('/staffs/clients/exists', {
            field: field,
            value: value
          }).then(({data}) => {
              if (field == 'phone') {
                resolve(!data || 'Такой телефон уже присутствует в базе')
              } else {
                resolve(!data || 'Такой email уже присутствует в базе')
              }
          })
        })
      },
      existsRecord: function(e) {
        this.existsClientByField(e.currentTarget.dataset.name, e.currentTarget.value)
      },
      clearForm: function() {
        this.email = ''
        this.phone = ''
        this.errors = []
        this.name = ''
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
