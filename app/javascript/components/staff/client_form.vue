<template lang="pug">
    div
        p(v-if="errors.length")
            b Пожалуйста исправьте указанные ошибки:
            ul
                li(v-for="error in errors") {{ error }}

        form(action="/staffs/clients" v-on:submit.prevent="checkForm")
            div(class="field")
                label(for="name_field") Имя
                br
                input(id="name_field" type="text" name="client[name]" v-model="name")
            div(class="field")
                label(for="email_field") Email
                br
                input(id="email_field" type="email" name="client[email]" v-model="email")
            div(class="field")
                label(for="phone_field") Телефон
                br
                input(id="phone_field" autocomplete="phone" type="text" name="client[phone]" v-model="phone")
            div(class="field")
                label(for="password_field") Пароль
                br
                input(id="password_field" autocomplete="current-password" type="password" name="client[password]" v-model="password")
            div(class="actions")
                input(type="submit" name="commit" value="Создать")
</template>


<script>
  import axios from "axios";

  export default {
    name: 'client-form',
    data() {
      return {
        email: '',
        password: '',
        name: '',
        phone: '',
        errors: [],
      }
    },
    methods: {
      checkForm: function (e) {
        this.errors = [];

        const emailCheck = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (this.name.length < 5) {
          this.errors.push('Имя не может быть пустым и должно содержать не менее 5 символов');
        }

        if (this.phone == '') {
          this.errors.push('Телефон не может быть пустым');
        }

        if (! (/^\d+$/.test(this.phone))) {
          this.errors.push('Телефон должен содержать только цифры');
        }

        if (!emailCheck.test(this.email)) {
          this.errors.push('Email не валидный');
        }

        if (this.errors.length) {
          e.preventDefault();
          return false;
        }

        this.onSubmit();
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
          .then(_ => {
            this.$parent.fetchClients();
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
