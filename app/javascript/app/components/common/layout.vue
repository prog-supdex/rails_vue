<template lang="pug">
    q-layout(view="hHh lpR fFf" class="bg-teal-5")
      q-page-container
        q-page(class="window-height window-width row justify-center items-center")
          q-btn(color="secondary" type="a" :href="$router.resolve({name: 'client_organizations'}).href" label="Клиенты" class="q-mr-sm" size="22px")
          q-btn(color="secondary" type="a" :href="$router.resolve({name: 'staff_organizations'}).href" label="Сотрудники" class="q-ml-sm" size="22px")
</template>

<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>
