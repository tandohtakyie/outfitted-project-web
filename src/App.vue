<template>
  <div id="app" class="small-container">
    <h1>Employee List</h1>
    <employer-form @add:employee="createEmployee"/>
    <admin-panel :employees="employees" />
  </div>
</template>

<script>
import AdminPanel from '@/components/AdminPanel.vue'
import EmployerForm from '@/components/EmployerForm.vue'

export default {
  name: 'app',
  components: {
    AdminPanel,
    EmployerForm,
  },
  data() {
    return {
      employees: [
        {
          id: 1,
          name: 'Terence Martin',
          email: 't.martin@outfited.com'
        },
        {
          id: 2,
          name: 'Peppe Hiram',
          email: 'p.hiram@outfited.com'
        },
        {
          id: 3,
          name: 'Alan Natalia',
          email: 'a.natalia@outfited.com'
        },
        {
          id: 4,
          name: 'Ratmir Viktoria',
          email: 'r.viktoria@outfited.com'
        },
      ],
    }
  },

  methods: {
    createEmployee(employee) {
      const PreviousId = this.employees.length > 0
          ? this.employees[this.employees.length - 1].id
          : 0;
      const employeeId = PreviousId + 1;
      const newEmployee = {...employee, employeeId};

      this.employees = [...this.employees, newEmployee];
    }
  }
}
</script>

<style>
button {
  background: #009435;
  border: 1px solid #009435;
}

.small-container {
  max-width: 600px;
}
</style>