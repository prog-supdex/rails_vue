import Vue from 'vue'
import '../quasar/index'
import '../api/index'
import Dashboard from "../components/client/dashboard";

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    render: h => h(Dashboard)
  }).$mount()
})
