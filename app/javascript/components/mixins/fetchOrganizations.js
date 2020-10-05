export const fetchOrganizations = {
  data() {
    this.loading = true
  },
  created() {
    this.fetchOrganizations();
  },
  methods: {
    fetchOrganizations: function () {
      this.$api.get('/staffs/organizations')
        .then(({data}) => {
          this.organizations = data
          this.loading = false
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
