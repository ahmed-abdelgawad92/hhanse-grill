<template>
   <div>
      <form>
         <div class="alert alert-success" v-if="success">
            {{success}}
            <button type="button" class="close" aria-label="Close" @click="success=''">
               <span aria-hidden="true">&times;</span>
            </button>
         </div>
         <div class="alert alert-danger" v-if="error">
            {{error}}
            <button type="button" class="close" aria-label="Close" @click="error=''">
               <span aria-hidden="true">&times;</span>
            </button>
         </div>
         <div class="input-group">
            <div class="custom-file">
               <input @change="photoSelect" accept="image/*" type="file" class="custom-file-input" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04">
               <label class="custom-file-label" for="inputGroupFile04" ref="file_name">Ein Foto auswählen</label>
            </div>
            <div class="input-group-append">
               <button class="btn btn-primary" @click="submit" type="button" id="inputGroupFileAddon04">hochladen</button>
            </div>
         </div>
      </form>
   </div>
</template>

<script>
   import axios from 'axios';
   export default {
      data: () => {
         return {
            photo: null,
            success: '',
            error: ''
         }
      },
      methods: {
         photoSelect: function(e){
            this.photo = e.target.files[0];
            this.$refs.file_name.innerHTML = this.photo.name;  
         },
         submit: function(){
            this.success = '';
            this.error = '';
            if(!this.photo){
               this.error = 'Bitte wählen Sie ein Foto erstmal aus!';
               return false;
            }
            const data = new FormData();
            data.append('photo', this.photo);
            axios.post('client/photo/upload',data).then(response => {
               this.success = response.data.success;
               setTimeout(()=>{
                  this.success='';
               },3000);
            }).catch(error => {
               console.log(error.response.data)
               this.error = error.response.data.error;
               setTimeout(()=>{
                  this.error='';
               },3000);
            });
         }

      }
   }
</script>

<style scoped>
@media screen and (min-width: 900px){
   form{
      width: 70%;
      margin: 0 auto;
   }
}
</style>