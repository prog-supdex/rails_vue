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
  req.headers.common['X-CSRF-Token'] =
    document.querySelector('meta[name="csrf-token"]').getAttribute('content')

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
      } else if (res.data && res.data['errors']) {
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

Vue.prototype.$axios = axios
