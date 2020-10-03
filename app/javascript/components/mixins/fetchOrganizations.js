import axios from "axios";

export const fetchOrganizations = {
  data() {
    this.loading = true
  },
  created() {
    this.fetchOrganizations();
  },
  methods: {
    fetchOrganizations: function () {
      axios.get('/staffs/organizations')
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
