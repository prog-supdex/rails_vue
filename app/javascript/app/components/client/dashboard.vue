<template lang="pug">
  div
    organization-list
</template>

<script>
  import organizationList from "./organization_list";

  export default {
    name: 'client-dashboard',
    components: {
      organizationList
    }
  }
</script>
