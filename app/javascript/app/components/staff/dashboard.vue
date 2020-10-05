<template lang="pug">
    div
      client-list(ref="clientList")
      organization-list(ref="orgList")
      equipment-list(ref="orgList")
</template>

<script>
  import clientList from "./clients/list";
  import equipmentList from "./equipments/list";
  import organizationList from "./organizations/list";

  export default {
    name: 'dashboard',
    components: {
      organizationList,
      equipmentList,
      clientList
    }
  }
</script>

<style scoped lang="scss">
</style>
