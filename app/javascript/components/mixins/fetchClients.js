export const fetchClients = {
  data() {
    this.loading = true
  },
  created() {
    this.fetchClients();
  },
  methods: {
    fetchClients() {
      this.$axios.get('/staffs/clients')
        .then(({data}) => {
          this.clients = data
          this.loading = false
        })
    }
  }
}
