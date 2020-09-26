<template lang="pug">
    div.navigation-bar
        #logo
            img(:src="logo_staff")
        div(id="links" class="navigation-item" v-if="current_user")
            span Вошли как {{ current_user.name }} ({{ current_user.email }})
            a(href='/staffs/clients/new') Создать клиента
            a(href='/staffs/sign_out') Выйти
        div(id="links" v-else)
            a(href='/staffs/sign_in') Войти
</template>

<script>
  export default {
    data: function() {
      return {
        current_user: null,
        logo_staff: null
      }
    },
    props: {
      _current_user: {},
      _logo_staff: ''
    },
    mounted: function() {
      if (this._current_user !== null) {
        this.current_user = { ...this._current_user };
      }

      this.logo_staff = this._logo_staff
    }
  }
</script>

<style scoped lang="scss">
    .navigation-bar {
        display: flex;
        justify-content: space-around;
        width: 100%;
        background-color: #198dbb;
        padding: 10px 0;

        #logo {
            display: inline-block;

            img {
                width: 100px;
            }
        }
        #links {
            display: inline-block;

            a {
                margin-left: 10px;
            }
        }
    }

    .navigation-item {
        font-family:Arial, Helvetica, sans-serif;
        color: white;
        line-height: 1.6;
    }
</style>
