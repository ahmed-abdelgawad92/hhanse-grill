<template>
   <div class="card">
      <img :src="$domain+path" class="card-img-top">
      <div class="card-body text-center">
         <button class="btn btn-danger">löschen</button>
      </div>
   </div>
</template>

<script>
   import axios from 'axios';
   export default {
      props: ['photo'],
      computed: {
         path: function(){
            let path = 'storage/' + this.photo.photo.split('/')[1];
            return path;
         }
      },
      methods: {
         delete: function(){
            axios.delete(`client/photo/delete/${photo.id}`).then(response => {
               console.log(response.data);
            }).catch(err => console.log(err.response.data));
         }
      }
   }
</script>

<style scoped>
.card{
   height: 100%;
}
.card img{
   height: 80%;
}
</style>