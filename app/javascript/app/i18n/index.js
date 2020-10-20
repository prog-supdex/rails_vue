import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
  en: {
    client: {
      appName: 'Client`s application',
      linkName: 'Clients',
    },
    staff: {
      appName: 'Staff`s application',
      linkName: 'Staffs',
    },
    common: {
      edit: 'Edit',
      delete: 'Delete',
      update: 'Update',
      create: 'Create',
      close: 'Close',
      organizations: 'Organizations',
      clients: 'Clients',
      equipments: 'Equipments',
    },
  },
  ru: {
    client: {
      appName: 'Приложение клиента',
      linkName: 'Клиенты',
    },
    staff: {
      appName: 'Приложение сотрудника',
      linkName: 'Сотрудники',
    },
    common: {
      edit: 'Редактировать',
      delete: 'Удалить',
      update: 'Обновить',
      create: 'Создать',
      close: 'Закрыть',
      organizations: 'Организации',
      clients: 'Клиенты',
      equipments: 'Оборудования',
    },
  },
};

const i18n = new VueI18n({
  locale: 'ru',
  fallbackLocale: 'en',
  messages,
});

export default i18n;
