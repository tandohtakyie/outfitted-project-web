<template>
  <div id="admin-panel">
    <p v-if="employees.length < 1" class="empty-table">No employees found</p>
    <table v-else>
      <thead>
        <tr>
          <th>Employee name</th>
          <th>Employee email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.id">
          <td v-if="editing === employee.id">
            <label>
              <input type ="text" v-model="employee.name">
            </label>
          </td>
        <td>{{ employee.name }}</td>
          <td v-if="editing === employee.name">
            <label>
              <input type ="text" v-model="employee.email">
            </label>
          </td>
        <td>{{ employee.email }}</td>
          <td v-if="editing === employee.name">
            <button @click="editEmployee(employee)">Save</button>
          </td>
          <td v-else>
          <button @click="editMode(employee.name)">Edit</button>
          <button @click="$emit('delete:employee', employee.name)">Delete</button>
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
        this.$emit('edit:employee', employee.name, employee)
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