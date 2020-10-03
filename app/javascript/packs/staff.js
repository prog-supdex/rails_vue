import Vue from 'vue'
import '../quasar/index'
import Dashboard from "../components/staff/dashboard";
import axios from "axios";

document.addEventListener('DOMContentLoaded', () => {
  axios.defaults.headers.common['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

  new Vue({
    el: '#app',
    render: h => h(Dashboard)
  }).$mount()
})

