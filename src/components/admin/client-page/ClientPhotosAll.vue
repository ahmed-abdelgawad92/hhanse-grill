<template>
   <div class="container">
      <h2 class="mt-4 text-center text-muted mb-3">Ein neues Foto hinzufügen</h2>
      <photo-add></photo-add>
      <h2 class="mt-4 text-center text-muted mb-3">Alle Fotos im Gallery von Kundenseite</h2>
      <div class="row">
         <div v-for="photo in photos" :key="photo.id" class="col-6 col-sm-4 col-md-4 col-lg-3">
            <photo :photo="photo"></photo>
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
            photos: []
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
         }
      },
      created(){
         this.fetchAllPhotos();
      }
   }
</script>

<style scoped>
.row [class*='col-'] {
  min-height: 130px;
  margin-bottom: 15px;
}
</style>