export const fetchOrganizations = {
  data() {
    this.loading = true
  },
  created() {
    this.fetchOrganizations();
  },
  methods: {
    fetchOrganizations() {
      this.$axios.get('/staffs/organizations')
        .then(({data}) => {
          this.organizations = data
          this.loading = false
        })
    }
  }
}
