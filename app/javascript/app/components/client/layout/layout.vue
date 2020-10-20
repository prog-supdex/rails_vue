<template lang="pug">
  q-layout(view="lHh LpR fFf")
    q-header.bg-primary.text-white(elevated height-hint="98")
      q-toolbar
        q-toolbar-title
          q-avatar
            img(src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg")
          | Приложение Клиента
      navbar-layout

    q-page-container
      router-view

    q-footer.bg-grey-8.text-white(elevated)
      q-toolbar
        q-toolbar-title
          q-avatar
            img(src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg")
</template>

<script>
  import NavbarLayout from './navbar-layout'

  export default {
    name: 'layout',
    components: {
      'navbar-layout': NavbarLayout
    },
    data() {
      return {}
    },
  }
</script>
