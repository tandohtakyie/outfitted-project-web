<template>
  <div id="employer-form">
  <form @submit.prevent="manageSubmit">
        <label>Employee name</label>
        <input v-model="employee.name" type="text" />
        <label>Employee email</label>
        <input v-model="employee.email" type="text" />
        <button>Add Employee</button>
     </form>
  </div>
</template>

<script>
  export default {
    name: 'employer-form',
    data() {
      return {
       employee: {
    name: '',
    email: '',
       },
    }
  },
  methods:{
     manageSubmit(){
     this.$emit('add:employee',this.employee)
     },

   },
 }
</script>

<style scoped>
   form{
    margin-bottom: 2rem;
   }
</style>