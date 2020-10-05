import axios from "axios";

export const fetchClients = {
  data() {
    this.loading = true
  },
  created() {
    this.fetchClients();
  },
  methods: {
    fetchClients: function () {
      axios.get('/staffs/clients')
        .then(({data}) => {
          this.clients = data
          this.loading = false
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}