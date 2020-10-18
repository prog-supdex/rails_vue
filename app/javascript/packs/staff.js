import Vue from 'vue'
import '../app/api/index'
import Layout from "app/components/staff/layout/layout";
import router from '../app/router'
import store from '../app/store'
import '../app/socket'

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(Layout)
  }).$mount()
})

