<template>
  <div>
    <customer-form :customers="customers" @add:customer="createCustomer"/>
    <customer-panel :customers="customers"
                    @delete:customer="deleteCustomer"
                    @edit:customer="editCustomer"
    />
  </div>
</template>

<script>
import CustomerPanel from "@/components/Customers/CustomerPanel";
import CustomerForm from "@/components/Customers/CustomerForm";
import firebase from "firebase";

export default {
  name: 'customersComponent',
  components: {
    CustomerForm,
    CustomerPanel,
  },
  data() {
    return {
      customers: [

      ],
    }
  },

  mounted() {
    this.getAllCustomers()
  },

  methods: {
    async getAllCustomers() {
      try {
        var db = firebase.firestore();
        const customers = db.collection('customers');
        const snapshot = await customers.get();
        snapshot.forEach(doc => {
          this.customers = [...this.customers, doc.data()]
        });
      } catch (error) {
        console.error(error)
      }
    },
    async uploadFile(file, type, name, customer){
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
              customer.customerImage = downloadURL;
              var newCat = await db.collection('customers').add(customer);
              var id = newCat.id;
              customer.id = id;
              await newCat.update({id: id});

            });
          });
    },

    async createCustomer(customer) {
      try {
        this.uploadFile(customer.customerPicture, "customers", customer.name, customer);
        this.customers = [...this.customers, customer]
      } catch (error) {
        console.error(error)
      }
    },
    async deleteCustomer(p) {
      var db = firebase.firestore();
      console.log(p);
      await db.collection('customer').doc(p.id).delete();
      this.customers = this.customers.filter(customer => customer.id !== p.id);
      try {
        // Get a reference to the storage service, which is used to create references in your storage bucket
        var storage = firebase.storage();

        // Create a storage reference from our storage service
        var storageRef = storage.ref();

        // Create a reference to the file to delete
        var delRef = storageRef.child('customers/'+p.name+'.jpg');
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
    async editCustomer(id, updatedCustomer) {
      //const p = await pRef.get();
      var db = firebase.firestore();
      try {
        await db.collection('customers').doc(id.toString()).set(updatedCustomer);
        this.customers = this.customers.map(customer => (customer.id === id, customer));
        //replace the image, for when able
      } catch (error) {
        console.error(error)
      }
    },
    setNewCustomerId(customer){
      const previousCustomerId =
          this.customers.length > 0
              ? this.customers[this.customers.length - 1].id
              : 0;
      customer.id = previousCustomerId + 1;
    },
  }
}
</script>

<style scoped>

</style>