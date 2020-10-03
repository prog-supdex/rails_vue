<template lang="pug">
    layout
        template(v-slot:content)
            div
                organization-list
</template>

<script>
  import organizationList from "./organization_list";
  import layout from "../layout";

  export default {
    name: 'client-dashboard',
    components: {
      organizationList,
      layout
    }
  }
</script>

<style scoped lang="scss">
</style>
