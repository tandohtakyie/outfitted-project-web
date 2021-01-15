<template>
  <div>
    <product-panel :products="products"
                 @delete:product="deleteProduct"
                 @edit:product="editProduct"
    />
    <!-- Button trigger modal -->
    <b-button
      v-b-modal.addProductModal
      variant="btn-blue-outfitted"
      class="btn btn-blue-outfitted btn-hover btn-fab-right-bottom"
      v-b-tooltip.hover title="Add Product">
        <i class="fa fa-plus"></i>
    </b-button>

    <product-form :products="products" @add:product="createProduct"
    :categories="categories" v-if="categories.length"
    />
  </div>
</template>

<script>
import ProductForm from "@/components/Products/ProductForm";
import ProductPanel from "@/components/Products/ProductPanel";
import firebase from "firebase";

export default {
  name: 'productsComponent',
  components: {
    ProductForm,
    ProductPanel,
  },
  data() {
    return {
      products: [

      ],
      categories:[

      ],
    }
  },

  mounted() {
    this.getAllProducts();
    this.getAllCategories();
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
    async getAllProducts() {
      try {
        var db = firebase.firestore();
        const products = db.collection('products');
        const snapshot = await products.get();
        snapshot.forEach(doc => {
          this.products = [...this.products, doc.data()]
        });
      } catch (error) {
        console.error(error)
      }
    },
    async uploadFile(file, type, name, product){
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
                 product.productImage = downloadURL;
                 product.createdAt = Date.now();
                 var newProd = await db.collection('products').add(product);
                 var id = newProd.id;
                 product.id = id;
                 await newProd.update({id: id});

            });
          });
    },

    async createProduct(product) {
          try {
            this.uploadFile(product.productImage, "products", product.name, product);
            this.products = [...this.products, product]
          } catch (error) {
            console.error(error)
          }
    },
    async deleteProduct(p) {
      var db = firebase.firestore();
      console.log(p);
      await db.collection('products').doc(p.id).delete();
      this.products = this.products.filter(product => product.id !== p.id);
      try {
          // Get a reference to the storage service, which is used to create references in your storage bucket
          var storage = firebase.storage();

          // Create a storage reference from our storage service
          var storageRef = storage.ref();

           // Create a reference to the file to delete
           var delRef = storageRef.child('products/'+p.name+'.jpg');
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
    async editProduct(id, updatedProduct) {
      //const pRef = db.collection('products').doc('SF');
      //const p = await pRef.get();
      var db = firebase.firestore();
      try {
        await db.collection('products').doc(id.toString()).set(updatedProduct);
        this.products = this.products.map(product => (product.id === id, product));
        //replace the image, for when able
      } catch (error) {
        console.error(error)
      }
    },
    setNewProductId(product){
          const previousProductId =
              this.products.length > 0
                  ? this.products[this.products.length - 1].id
                  : 0;
          product.id = previousProductId + 1;
     },
  }
}
</script>

<style scoped>

</style>