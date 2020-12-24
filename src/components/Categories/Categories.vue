<template>
  <div>
    <category-form :categories="categories" @add:category="createCategory"/>
    <category-panel :categories="categories"
                 @delete:category="deleteCategory"
                 @edit:category="editCategory"
    />
  </div>
</template>

<script>
import CategoryPanel from "@/components/Categories/CategoryPanel";
import CategoryForm from "@/components/Categories/CategoryForm";
import firebase from "firebase";

export default {
  name: 'categoriesComponent',
  components: {
    CategoryForm,
    CategoryPanel,
  },
  data() {
    return {
      categories: [

      ],
    }
  },

  mounted() {
    this.getAllCategories()
  },

  methods: {
    async getAllCategories() {
      try {
        var db = firebase.firestore();
        const categories = db.collection('categories');
        const snapshot = await categories.get();
        snapshot.forEach(doc => {
          this.categories = [...this.categories, doc.data()]
        });
      } catch (error) {
        console.error(error)
      }
    },
    async uploadFile(file, type, name, category){
      var db = firebase.firestore();
      var storageRef = firebase.storage().ref();

      // Create a reference to 'mountains.jpg'
      var typeRef = storageRef.child(name+'.jpg');

      // Create a reference to 'images/mountains.jpg'
      var typeNameRef = storageRef.child(type+'/'+name+'.jpg');

      // While the file names are the same, the references point to different files
      typeRef.name === typeNameRef.name            // true
      typeRef.fullPath === typeNameRef.fullPath    // false

      var uploadTask = typeNameRef.put(file);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          async function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
          }, function(error) {console.log(error)}, function() {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(async function(downloadURL) {
              category.categoryImage = downloadURL;
              var newCat = await db.collection('categories').add(category);
              var id = newCat.id;
              category.id = id;
              await newCat.update({id: id});

            });
          });
    },

    async createCategory(category) {
      try {
            this.uploadFile(category.categoryImage, "categories", category.name, category);
            this.categories = [...this.categories, category]
          } catch (error) {
            console.error(error)
          }
    },
    async deleteCategory(p) {
      var db = firebase.firestore();
      console.log(p);
      await db.collection('categories').doc(p.id).delete();
      this.categories = this.categories.filter(category => category.id !== p.id);
      try {
          // Get a reference to the storage service, which is used to create references in your storage bucket
          var storage = firebase.storage();

          // Create a storage reference from our storage service
          var storageRef = storage.ref();

           // Create a reference to the file to delete
           var delRef = storageRef.child('categories/'+p.name+'.jpg');
           console.log(delRef);

           // Delete the file
           delRef.delete().then(function() {
             // File deleted successfully
             console.log("file deleted");
           }).catch(function(error) {
             // Uh-oh, an error occurred!
             console.log(error);
           });
      } catch (error) {
        console.error(error);
      }
    },
    async editCategory(id, updatedCategory) {
      //const p = await pRef.get();
      var db = firebase.firestore();
      try {
        await db.collection('categories').doc(id.toString()).set(updatedCategory);
        this.categories = this.categories.map(category => (category.id === id, category));
        //replace the image, for when able
      } catch (error) {
        console.error(error)
      }
    },
    setNewCategoryId(category){
          const previousCategoryId =
              this.categories.length > 0
                  ? this.categories[this.categories.length - 1].id
                  : 0;
          category.id = previousCategoryId + 1;
     },
  }
}
</script>

<style scoped>

</style>