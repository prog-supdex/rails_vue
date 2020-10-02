<template>
    <q-layout view="lHh LpR fFf">

        <q-header elevated class="bg-primary text-white" height-hint="98">
            <q-toolbar>
                <q-toolbar-title>
                    <q-avatar>
                        <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
                    </q-avatar>
                    Title
                </q-toolbar-title>

                <q-btn dense flat round icon="menu" @click="right = !right" />
            </q-toolbar>

            <navbar-layout></navbar-layout>
        </q-header>

        <q-drawer show-if-above v-model="right" side="right" bordered>
            <!-- drawer content -->
        </q-drawer>

        <q-page-container>
            <slot name="content" />
        </q-page-container>

        <q-footer elevated class="bg-grey-8 text-white">
            <q-toolbar>
                <q-toolbar-title>
                    <q-avatar>
                        <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
                    </q-avatar>
                    Title
                </q-toolbar-title>
            </q-toolbar>
        </q-footer>

    </q-layout>
</template>

<script>
  import NavbarLayout from './navbar-layout'
  import { Quasar, QLayout, QToolbar, QHeader, QFooter } from 'quasar/dist/quasar.common'

  export default {
    name: 'layout',
    components: {
      Quasar,
      QHeader,
      QFooter,
      QLayout,
      QToolbar,
      'navbar-layout': NavbarLayout
    },
    data: function() {
      return {
        right: false
      }
    },
  }
</script>
