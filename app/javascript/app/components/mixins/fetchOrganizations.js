export const fetchOrganizations = {
  data() {
    this.loading = true
  },
  created() {
    this.fetchOrganizations();
  },
  methods: {
    fetchOrganizations() {
      this.$api.staffs.organizations.index()
        .then(({data}) => {
          this.organizations = data
          this.loading = false
        })
    }
  }
}
