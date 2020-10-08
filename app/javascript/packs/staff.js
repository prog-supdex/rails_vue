import Vue from 'vue'
import '../app/api/index'
import Layout from "app/components/staff/layout/layout";
import router from '../app/router'

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    router,
    render: h => h(Layout)
  }).$mount()
})

