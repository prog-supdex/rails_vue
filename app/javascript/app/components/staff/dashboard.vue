<template lang="pug">
  div
    div(class="q-pa-md")
      client-form(ref="clientForm" v-on:reload-client-list-event="fetchClients")
      organization-form(ref="orgForm" v-on:reload-org-list-event="fetchOrganizations")
    div
      client-list(ref="clientList" v-on:open-client-form-event="openClientForm" v-on:delete-client-event="deleteClientRecord")
      organization-list(ref="orgList" v-on:open-org-form-event="openOrgForm" v-on:delete-org-event="deleteOrgRecord")
</template>

<script>
  import clientForm from "./clients/form";
  import clientList from "./clients/list";
  import organizationList from "./organizations/list";
  import organizationForm from "./organizations/form";

  export default {
    name: 'dashboard',
    components: {
      clientForm,
      clientList,
      organizationList,
      organizationForm
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
        this.$refs.orgForm.deleteRecord(orgObject);
      },
      openClientForm: function(clientId) {
        this.$refs.clientForm.openForm(clientId);
      },
      deleteClientRecord: function(clientObject) {
        this.$refs.clientForm.deleteRecord(clientObject);
      }
    }
  }
</script>
