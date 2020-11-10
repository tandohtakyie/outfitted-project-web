<template>
  <div id="admin-panel">
    <p v-if="employees.length < 1" class="empty-table">No employees found</p>
    <table v-else>
      <thead>
        <tr>
          <th>Employee name</th>
          <th>Employee email</th>
          <th>Employee password</th>
          <th>Street</th>
          <th>City</th>
          <th>State</th>
          <th>Postal code</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.id">
          <td v-if="editing === employee.id">
              <input type ="text" v-model="employee.name">
          </td>
        <td v-else>{{ employee.name }}</td>
          <td v-if="editing === employee.id">
              <input type ="text" v-model="employee.email">
          </td>
        <td v-else>{{ employee.email }}</td>
          <td v-if="editing === employee.id">
            <input type ="text" v-model="employee.password">
          </td>
          <td v-else>{{ employee.password }}</td>
          <td v-if="editing === employee.id">
            <input type ="text" v-model="employee.address.street">
          </td>
          <td v-else>{{ employee.address.street }}</td>
          <td v-if="editing === employee.id">
            <input type ="text" v-model="employee.address.city">
          </td>
          <td v-else>{{ employee.address.city }}</td>
          <td v-if="editing === employee.id">
            <input type ="text" v-model="employee.address.state">
          </td>
          <td v-else>{{ employee.address.state }}</td>
          <td v-if="editing === employee.id">
            <input type ="text" v-model="employee.address.postalCode">
          </td>
          <td v-else>{{ employee.address.state }}</td>

          <td v-if="editing === employee.id">
            <button @click="editEmployee(employee)">Save</button>
          </td>
          <td v-else>
          <button @click="editMode(employee.id)">Edit</button>
          <button @click="$emit('delete:employee', employee.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'admin-panel',
    props: {
    employees: Array,
    },
    data() {
      return {
        editing: null,
      }
    },
    methods: {
      editMode(id) {
        this.editing = id
      },

      editEmployee(employee) {
        if (employee.name === '' || employee.email === '') return
        this.$emit('edit:employee', employee.id, employee)
        this.editing = null
      }
    }

  }
</script>

<style scoped>
button {
  margin: 0.5rem;
}
</style>