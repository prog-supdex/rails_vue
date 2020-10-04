import Vue from 'vue'
import '../app/api/index'
import Dashboard from "app/components/staff/dashboard";
import router from '../app/router'

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    router,
    render: h => h(Dashboard)
  }).$mount()
})

