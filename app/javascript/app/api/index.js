import Vue from 'vue'
import axios from 'axios'
import '../quasar/index'
import { Notify } from 'quasar/dist/quasar.common'

const DATA_WITH_URLS = [
  {
    url: '/staffs/organizations',
    template_message: 'Объект "Организация «__NAME__»" был __ACTION__!',
  },
  {
    url: '/staffs/clients',
    template_message: 'Объект "Клиент «__NAME__»" был __ACTION__!',
  }
]

const METHODS_WITH_TRANSLATE = {
  'patch': 'обновлен',
  'delete': 'удален',
  'post': 'создан'
}

axios.interceptors.request.use(req => {
  req.headers.common['Accept'] = 'application/json';
  req.headers.common['X-CSRF-Token'] =
    document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  return req;
});

axios.interceptors.response.use(
  res => {
    let matchedObject = false

    for (let dataObject of DATA_WITH_URLS) {
      if (res.config.url.includes(dataObject.url)) {
        matchedObject = dataObject
        break;
      }
    }

    if (matchedObject && Object.keys(METHODS_WITH_TRANSLATE).includes(res.config.method)) {
      if (res.data['success']) {
        Notify.create({
          icon: 'done',
          color: 'positive',
          message: matchedObject
            .template_message
            .replace('__NAME__', res.data.object.name)
            .replace('__ACTION__', METHODS_WITH_TRANSLATE[res.config.method])
        });
      } else {
        Notify.create({
          icon: 'done',
          color: 'negative',
          message: res.data.errors
        })
      }
    }

    return res;
  },
  err => {
    console.log(err)

    return err;
  }
);

const api = {
  staffs: {
    organizations: {
      index: () => axios.get('/staffs/organizations'),
      show: (id) => axios.get(`/staffs/organizations/${id}`),
      delete: (id) => axios.delete(`/staffs/organizations/${id}`)
    },
    clients: {
      index: () => axios.get('/staffs/clients'),
      show: (id) => axios.get(`/staffs/clients/${id}`),
      delete: (id) => axios.delete(`/staffs/clients/${id}`),
      exists: (params) => axios.post('/staffs/clients/exists', params),
    }
  },
}

Vue.prototype.$axios = axios
Vue.prototype.$api = api
