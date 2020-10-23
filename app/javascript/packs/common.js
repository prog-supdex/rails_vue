import Vue from 'vue';
import '../app/api/index';
import Layout from '../app/components/common/layout.vue';
import i18n from '../app/i18n';
import router from '../app/router';

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    render: (h) => h(Layout),
    i18n,
    router,
  }).$mount();
});
