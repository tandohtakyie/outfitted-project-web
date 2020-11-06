<template>
  <div>
    <product-form :products="products" @add:product="createProduct"/>
    <product-panel :products="products"
                 @delete:product="deleteProduct"
                 @edit:product="editProduct"
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
    }
  },

  mounted() {
    this.getAllProducts()
  },

  methods: {
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

    async createProduct(product) {
      console.log(product);

      this.setNewProductId(product);
      var db = firebase.firestore();
      try {
      // Create a root reference
                  var storageRef = firebase.storage().ref();

                  // Create a reference to 'mountains.jpg'
                  var typeRef = storageRef.child(product.name+'.jpg');

                  // Create a reference to 'images/mountains.jpg'
                  var typeNameRef = storageRef.child('products/'+product.name+'.jpg');

                  // While the file names are the same, the references point to different files
                  typeRef.name === typeNameRef.name            // true
                  typeRef.fullPath === typeNameRef.fullPath    // false

                  var file = product.productImage // use the Blob or File API
                  // Upload file and metadata to the object 'images/mountains.jpg'
                  var uploadTask = typeNameRef.put(file);

                  // Listen for state changes, errors, and completion of the upload.
                  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                    function(snapshot) {
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
                    }, function(error) {

                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                      case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;

                      case 'storage/canceled':
                        // User canceled the upload
                        break;

                      case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                    }
                  }, function() {
                    // Upload completed successfully, now we can get the download URL
                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                      product.productImage = downloadURL;
                      db.collection('products').doc(product.id.toString()).set(product);
                    });
                  });



        this.products = [...this.products, product]
      } catch (error) {
        console.error(error)
      }
    },
    async deleteProduct(id) {
      console.log(id);
      var db = firebase.firestore();
      try {
        await db.collection('products').doc(id).delete();
        this.products = this.products.filter(product => product.id !== id);
      } catch (error) {
        console.error(error);
      }
    },
    async editProduct(id, updatedProduct) {
      console.log(id);
      var db = firebase.firestore();
      try {
        await db.collection('products').doc(id).set(updatedProduct);
        this.products = this.products.map(product => (product.id === id, product));
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