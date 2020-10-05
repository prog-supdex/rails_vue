export const fetchClients = {
  data() {
    this.loading = true
  },
  created() {
    this.fetchClients();
  },
  methods: {
    fetchClients() {
      this.$api.staffs.clients.index()
        .then(({data}) => {
          this.clients = data
          this.loading = false
        })
    }
  }
}
