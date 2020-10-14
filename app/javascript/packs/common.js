import Vue from 'vue'
import '../app/api/index'
import Layout from "app/components/common/layout"
import router from '../app/router'

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    render: h => h(Layout),
    router
  }).$mount()
})
