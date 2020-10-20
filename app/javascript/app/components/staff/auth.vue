<template lang="pug">
  q-card(style="width: 750px; max-width: 85vw;")
    h5.q-pa-lg Авторизация сотрудника
    q-form.justify-center.q-pa-lg(@submit="onSubmit")
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
       staff: {
         email: '',
         password: ''
       }
     }
   },
   methods: {
     onSubmit() {
       this.$api.staffs.sign_in({
         staff: this.staff
       })
         .then(({data}) => {
           if (data['success']) {
             this.$store.dispatch('currentUser')
               .finally(() => this.$router.push({name: 'staff_organizations'}))
           }
         })
     },
   }
 }
</script>
