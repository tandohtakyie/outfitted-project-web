<template>
  <div id="category-panel">
    <p v-if="categories.length < 1" class="empty-table">No categories found</p>
    <table v-else>
      <thead>
      <tr>
        <th>Category name</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="category in categories" :key="category.id">
        <td v-if="editing === category.id">
          <label>
            <input type ="text" v-model="category.name">
          </label>
        </td>
        <td v-else>{{ category.name }}</td>
        <td v-if="editing === category.id">
          <button @click="editCategory(category)">Save</button>
        </td>
        <td v-else>
          <button @click="editMode(category.id)">Edit</button>
          <button @click="$emit('delete:category', category)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'category-panel',
  props: {
    categories: Array,
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

    editCategory(category) {
      if (category.name === '' || category.categoryPicture === '') return
      this.$emit('edit:category', category.id, category)
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