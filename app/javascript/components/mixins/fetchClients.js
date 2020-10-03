import axios from "axios";

export const fetchClients = {
  created() {
    this.fetchClients();
  },
  methods: {
    fetchClients: function () {
      axios.get('/staffs/clients')
        .then(({data}) => {
          this.clients = data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
