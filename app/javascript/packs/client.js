import Vue from 'vue';
import '../app/api/index';
import Layout from '../app/components/client/layout/layout.vue';
import i18n from '../app/i18n';
import store from '../app/store';
import router from '../app/router';

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    router,
    i18n,
    store,
    render: (h) => h(Layout),
  }).$mount();
});
