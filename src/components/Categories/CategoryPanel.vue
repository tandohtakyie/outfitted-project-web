<template>
  <div id="category-panel">
    <p v-if="categories.length < 1" class="empty-table">No categories found</p>
    <table class="table table-striped table-bordered" v-else>
      <thead class="thead-dark">
      <tr>
        <th>Category name</th>
        <th class="txt-center">Actions</th>
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
          <button @click="editCategory(category)" class="btn-table btn-primary btn-sm">
            <font-awesome-icon icon="save" />
          </button>
        </td>
        <td class="txt-center" v-else>
          <button @click="editMode(category.id)" class="btn-table btn btn-success btn-sm">
            <font-awesome-icon icon="edit" />
          </button>
          <button @click="$emit('delete:category', category)" class="btn-table btn btn-danger btn-sm">
            <font-awesome-icon icon="trash" />
          </button>
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