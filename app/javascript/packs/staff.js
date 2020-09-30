import Vue from 'vue/dist/vue.esm'

document.addEventListener('DOMContentLoaded', () => {
  Vue.component('my-component', {
    template: '<p>Hello {{ message }}</p>',
    data() {
      return {
        message: 'Vue'
      }
    }
  })

  new Vue({
    el: '#app'
  }).$mount()
})

