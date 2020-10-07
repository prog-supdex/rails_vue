<template lang="pug">
  q-card(style="width: 750px; max-width: 85vw;")
    h5.q-pa-lg Авторизация сотрудника
    q-form(@submit="onSubmit" class="justify-center q-pa-lg")
      q-input(
        ref="email"
        v-model="staff.email"
        label="Emai"
        filled
        placeholder="Email"
        lazy-rules
        :rules="[\
          val => val !== '' || 'Укажите email',\
        ]"
      )
      br
      q-input(
        ref="password"
        v-model="staff.password"
        label="Пароль"
        filled
        placeholder="Пароль"
        lazy-rules
        :rules="[\
          val => val !== '' || 'Укажите пароль',\
        ]"
      )
      br
      div
        q-btn(label="Войти" type="submit" color="primary")
</template>

<script>

 export default {
   name: 'auth',
   data() {
     return {
       client: {
         email: '',
         password: ''
       }
     }
   },
   methods: {
     onSubmit() {
       this.$api.clients.sign_in({
         staff: this.staff
       })
         .then(({data}) => {
           if (data['success']) {
             this.$router.push({ name: 'client_organizations' })
           }
         })
     },
   }
 }
</script>
