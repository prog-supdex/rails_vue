import Vue from 'vue/dist/vue.esm'
import Dashboard from 'components/staff/dashboard'
import axios from 'axios'

document.addEventListener('DOMContentLoaded', () => {
  axios.defaults.headers.common['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

  Vue.component('client-list-component', {
    render: h => h(Dashboard)
  })

  new Vue({
    el: '#staff-clients',
    data: {
      email: '',
      password: '',
      name: '',
      phone: '',
      errors: [],
    },
    methods: {
      checkForm: function (e) {
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
            this.reloadClientList();
          })
          .catch(error => {
            console.log(error)
          })
      },
      reloadClientList: function () {
        this.$root.$emit('client-list-update-component');
      }
    }
  })
})
