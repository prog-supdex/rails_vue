import Vue from 'vue'
import '../../app/api/index'
import Dashboard from 'app/components/staff/dashboard'

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    render: h => h(Dashboard)
  })
})
