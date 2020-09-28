import Vue from 'vue/dist/vue.esm'
import Dashboard from 'components/staff/dashboard'
import axios from 'axios'

document.addEventListener('DOMContentLoaded', () => {
  axios.defaults.headers.common['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

  // Vue.component('client-list-component', {
  //   render: h => h(Dashboard)
  // })

  // Vue.component('client-form-component', {
  //   render: h => h(ClientForm)
  // })

  new Vue({
    el: '#staff-clients',
    components: {
      'client-list-component': Dashboard
    }
  })
})
