import axios from "axios";

export const fetchOrganizations = {
  created() {
    this.fetchOrganizations();
  },
  methods: {
    fetchOrganizations: function () {
      axios.get('/staffs/organizations')
        .then(({data}) => {
          this.organizations = data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
