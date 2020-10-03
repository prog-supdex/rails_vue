<template>
    <q-layout view="lHh LpR fFf">

        <q-header elevated class="bg-primary text-white" height-hint="98">
            <q-toolbar>
                <q-toolbar-title>
                    <q-avatar>
                        <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
                    </q-avatar>
                    Приложение
                </q-toolbar-title>
            </q-toolbar>

            <navbar-layout></navbar-layout>
        </q-header>

        <q-page-container>
            <slot name="content">
                Авторизуйтесь
            </slot>
        </q-page-container>

        <q-footer elevated class="bg-grey-8 text-white">
            <q-toolbar>
                <q-toolbar-title>
                    <q-avatar>
                        <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
                    </q-avatar>
                </q-toolbar-title>
            </q-toolbar>
        </q-footer>

    </q-layout>
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
