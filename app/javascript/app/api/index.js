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
  },
  {
    url: '/staffs/equipments',
    template_message: 'Объект "Оборудование «__NAME__»" был __ACTION__!',
  },
  {
    url: '/staffs/sign_in',
    template_message: 'Пользователь «__NAME__»" был авторизован!',
  },
  {
    url: '/clients/sign_in',
    template_message: 'Пользователь «__NAME__»" был авторизован!',
  },
  {
    url: 'users/reset_password',
    template_message: 'Пароль пользователя «__NAME__»" был изменен!'
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
      if (!res.data || !res.data.object) {
        return res;
      }

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
      index: (params) => axios.get('/staffs/organizations', { params: params }),
      show: (id) => axios.get(`/staffs/organizations/${id}`),
      create: (params) => axios.post('/staffs/organizations', params),
      update: (id, params) => axios.patch(`/staffs/organizations/${id}`, params),
      delete: (id) => axios.delete(`/staffs/organizations/${id}`)
    },
    clients: {
      index: (params) => axios.get('/staffs/clients', { params: params }),
      create: (params) => axios.post('/staffs/clients', params),
      update: (id, params) => axios.patch(`/staffs/clients/${id}`, params),
      show: (id) => axios.get(`/staffs/clients/${id}`),
      delete: (id) => axios.delete(`/staffs/clients/${id}`),
      exists: (params) => axios.post('/staffs/clients/exists', params),
    },
    equipments: {
      index: () => axios.get('/staffs/equipments'),
      show: (id) => axios.get(`/staffs/equipments/${id}`),
      delete: (id) => axios.delete(`/staffs/equipments/${id}`),
      exists: (params) => axios.post('/staffs/equipments/exists', params),
      free_equipments: () => axios.get('/staffs/equipments/free_equipments'),
      create: (params) => axios.post('/staffs/equipments', params),
      update: (id, params) => axios.patch(`/staffs/equipments/${id}`, params)
    },
    sign_out: () => axios.get('/staffs/sign_out'),
    sign_in: (params) => axios.post('/staffs/sign_in/', params)
  },
  clients: {
    sign_out: () => axios.get('/clients/sign_out'),
    sign_in: (params) => axios.post('/clients/sign_in/', params),
    organizations: {
      index: () => axios.get('/clients/organizations'),
    }
  },
  users: {
    reset_password: (params) => axios.post('/users/reset_password', params),
    reset_password_form: (id, type) => axios.post(`/users/reset_password/${id}/${type}`),
    current_user: () => axios.get('/users/current_user')
  }
}

Vue.prototype.$axios = axios
Vue.prototype.$api = api
