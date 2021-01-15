<template>

  <div>
    <b-modal id="addCategoryModal"
             title="Add new category"
             header-bg-variant="dark"
             header-text-variant="light">
      
      <b-container fluid>
        <b-row class="mb-1">
          <b-col>
            <div id="category-form">
              <form @submit.prevent="manageSubmit">
                <label>Category name</label>
                <label>
                  <input class="categoryNameInput"
                        ref = "categoryNameField"
                        v-model="category.name"
                        type="text"
                        :class="{ 'has-error': submission && emptyCategoryName }"
                  />
                </label>
                <div class = "imageChoser">
                  <label>Choose a category image</label>
                  <input type="file" accept="image/*" @change="chosenImage ">
                </div>
                <p v-if="submission && emptyField" class="failure-message">
                  Please fill out the required fields ! </p>
                <p v-else-if="success" class="acceptance-message">Category has been successfully added!</p>
                <!-- <button>Add Category</button> -->
              </form>
            </div>
          </b-col>
        </b-row>
      </b-container>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="primary"
            size="lg"
            @click="$bvModal.hide('addCategoryModal')">
            Close
          </b-button>
          <b-button
              size="lg"
              variant="success"
              class="float-right"
              @click="manageSubmit()">
            Add
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>

export default {
  name: 'category-form',
  data() {
    return {
      submission: false,
      failure: false,
      emptyField: false,
      success: false,
      category: {
        name: '',
        categoryPicture: ''
      },
    }
  },
  methods: {
    manageSubmit() {
      this.submission = true
      this.clearStatus()

      if (this.emptyCategory || this.emptySupplierName) {
        this.failure = true
        this.emptyField = true
     //   this.$refs.categoryNameField.focus()
        return
      }

      this.success = true
      this.$emit('add:category', this.category)
     // this.$refs.category.focus()
      this.category = {
        name: "",
        categoryPicture: "",
      }
      this.submission = false
    },

    clearStatus() {
      this.success = false
      this.failure = false
      this.emptyField = false
    },
    chosenImage(event) {
      this.category.categoryImage = event.target.files[0]
    },
  },
    computed: {
      emptyCategoryPicture(){
        return this.category.categoryImage ===''
      },
      emptyCategoryName(){
        return this.category.name ===''
      },

  },
}


</script>

<style scoped>

[class*='-notification'] {
  font-weight: 400;
}

form {
  margin-bottom: 5rem;
}

.acceptance-message {
  color: #32a95d;
}
.failure-message {
  color: #d33c40;
}
</style>