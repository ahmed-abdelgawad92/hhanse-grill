<template>
   <div class="container">
      <h2 class="mt-4 text-center text-muted mb-3">Ein neues Foto hinzufügen</h2>
      <photo-add @fetchAll="fetchAllPhotos"></photo-add>
      <h2 class="mt-4 text-center text-muted mb-3">Alle Fotos im Gallery von Kundenseite</h2>
      <div class="alert alert-success" v-if="success">
         {{success}}
         <button type="button" class="close" aria-label="Close" @click="success=''">
            <span aria-hidden="true">&times;</span>
         </button>
      </div>
      <div class="row">
         <div v-for="photo in photos" :key="photo.id" class="col-6 col-sm-4 col-md-4 col-lg-3">
            <photo :photo="photo" @successDelete="showNotification"></photo>
         </div>
      </div>
   </div>
</template>

<script>
   import axios from 'axios';
   import PhotoAdd from './ClientPhotoAdd.vue';
   import Photo from './ClientPhoto.vue';
   export default {
      data: () => {
         return {
            photos: [],
            success: ''
         }
      },
      components: {
         PhotoAdd,
         Photo
      },
      methods: {
         fetchAllPhotos: function(){
            axios.get('client/photos').then(response => {
               this.photos = response.data.photos;
            }).catch(err => console.log(err.response.data));
         },
         showNotification: function(val){
            this.success = val;
            this.fetchAllPhotos();
            setTimeout(()=>{ this.success = '' },3000);

         }
      },
      created(){
         this.fetchAllPhotos();
      }
   }
</script>

<style scoped>
.row [class*='col-'] {
  min-height: 230px;
  margin-bottom: 15px;
}
</style>