export const fetchOrganizations = {
  data() {
    this.loading = true
    this.searchString = ''
  },
  created() {
    this.fetchOrganizations();
  },
  methods: {
    fetchOrganizations() {
      console.log(this.searchString)
      this.$api.staffs.organizations.index(this.searchString)
        .then(({data}) => {
          this.organizations = data
          this.loading = false
        })
    }
  }
}
