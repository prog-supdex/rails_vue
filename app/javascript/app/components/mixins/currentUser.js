export const currentUser = {
  data: function () {
    return {
      current_user: null
    }
  },
  methods: {
    fetchCurrentUser: function (type) {
      this.$api.users.current_user()
        .then(({data}) => {
          if (!data) {
            this.$router.push({ name: `${type}_sign_in` })
          }

          this.current_user = data
        })
    },
  }
}
