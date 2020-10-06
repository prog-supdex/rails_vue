<template lang="pug">
  div
    q-dialog(v-model="showDialog" title="Сбросить пароль" persistent @hide="pushToItems")
      q-card(style="width: 750px; max-width: 85vw;")
        q-form(class="justify-center q-pa-lg" @submit="checkForm" @reset.prevent.stop="onReset")
          q-input(
            ref="password"
            v-model="data.password"
            label="Новый пароль"
            :type="isPwd ? 'password' : 'text'"
            filled
            lazy-rules
            :rules="[\
              val => val !== '' || 'Укажите пароль',\
              val => val.length >= 8 || 'Пароль должно содержать не меньше 8 символов'\
            ]"
          )
            template(v-slot:append)
              q-icon(:name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd")

          br
          q-input(
            ref="confirm_password"
            v-model="data.confirm_password"
            label="Повторите пароль"
            :type="isPwd ? 'password' : 'text'"
            filled
            lazy-rules
            :rules="[\
              val => val !== '' || 'Укажите пароль',\
              passwordsCheck\
            ]"
          )
            template(v-slot:append)
              q-icon(:name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd")
          br

          div
            q-btn(label="Сбросить пароль" type="submit" color="primary")
            q-btn(v-close-popup label="Закрыть" color="secondary")
</template>


<script>
  export default {
    name: 'reset-password-form',
    data() {
      return {
        showDialog: true,
        isPwd: false,
        user: {},
        data: {
          password: '',
          confirm_password: '',
        }
      }
    },
    computed: {
      id() {
        return this.$route.params.id;
      },
      type() {
        return this.$route.params.type;
      }
    },
    methods: {
      checkForm() {
        this.$refs.password.validate();
        this.$refs.confirm_password.validate();

        if (this.$refs.password.hasError || this.$refs.confirm_password.hasError) {
          this.formHasError = true
        } else {
          this.onSubmit();
        }
      },
      passwordsCheck: function(val) {
        return val == this.$refs.password.value || 'Пароли должны совпадать'
      },
      onSubmit() {
        this.$api.users.reset_password({
          id: this.id,
          type: this.type,
          password: this.data.password,
          confirm_password: this.data.confirm_password
        })
          .then(({data}) => {
            if (data.success) {
              this.onReset();
              this.showDialog = false;
            }
          })
      },
      onReset () {
        this.password = '';
        this.confirm_password = '';

        this.$refs.password.resetValidation();
        this.$refs.confirm_password.resetValidation();
      },
      pushToItems() {
        this.$router.push({ name: 'staff_clients' })
      }
    }
  }
</script>
