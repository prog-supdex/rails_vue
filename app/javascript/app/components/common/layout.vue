<template lang="pug">
  q-layout.bg-teal-5(view="hHh lpR fFf")
    q-page-container
      q-page.window-height.window-width.row.justify-center.items-center
        q-btn.q-mr-sm(
          color="secondary"
          type="a"
          :href="$router.resolve({name: 'client_organizations'}).href"
          :label="$t('client.linkName')"
          size="22px"
        )

        q-btn.q-mr-sm(
          color="secondary"
          type="a"
          :href="$router.resolve({name: 'staff_organizations'}).href"
          :label="$t('staff.linkName')"
          size="22px"
        )
</template>

<script>
export default {
  data() {
    return {
    };
  },
};
</script>
