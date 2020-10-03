<template lang="pug">
    layout
        template(v-slot:content)
            div(class="q-pa-md")
                client-form(v-on:reload-client-list-event="fetchClients")
                organization-form(ref="orgForm" v-on:reload-org-list-event="fetchOrganizations")
            div
                client-list(ref="clientList")
                organization-list(ref="orgList" v-on:open-org-form-event="openOrgForm" v-on:delete-org-event="deleteOrgRecord")
</template>

<script>
  import clientForm from "./clients/form";
  import clientList from "./clients/list";
  import organizationList from "./organizations/list";
  import organizationForm from "./organizations/form";
  import layout from "../layout";

  export default {
    name: 'dashboard',
    components: {
      clientForm,
      clientList,
      organizationList,
      organizationForm,
      layout
    },
    methods: {
      fetchClients: function() {
        this.$refs.clientList.fetchClients()
      },
      fetchOrganizations: function() {
        this.$refs.orgList.fetchOrganizations()
      },
      openOrgForm: function(orgId) {
        this.$refs.orgForm.openForm(orgId);
      },
      deleteOrgRecord: function(orgObject) {
        console.log('callled!!!!')
        console.log(orgObject)
        this.$refs.orgForm.deleteRecord(orgObject);
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
