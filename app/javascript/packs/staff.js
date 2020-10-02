import Vue from 'vue'
import '../quasar/index'
import Layout from "../components/layout";


document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    render: h => h(Layout)
  }).$mount()
})

