<template>
   <div class="card">
      <img :src="$domain+path" class="card-img-top">
      <div class="card-body text-center">
         <button class="btn btn-danger" @click="deleteConfirm" type="button">löschen</button>
         <div class="modal" tabindex="-1" role="dialog" ref="modal">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Löschen bestätigen</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <p>Sind Sie sicher um das Foto zu löschen?</p>
                  <img :src="$domain+path" class="w-100">
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">abrechen</button>
                  <button type="button" class="btn btn-danger" @click="deletePhoto">löschen</button>
                </div>
              </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
   import axios from 'axios';
   export default {
      data: () => {
         return {
            error: ''
         }
      },
      props: ['photo'],
      computed: {
         path: function(){
            let path = 'storage/' + this.photo.photo.split('/')[1];
            return path;
         }
      },
      methods: {
         deletePhoto: function(){
            axios.delete(`client/photo/delete/${this.photo.id}`).then(response => {
               console.log(response.data);
               let element = this.$refs['modal'];
               $(element).modal('hide');
               this.$emit('successDelete', response.data.success);
            }).catch(err => console.log(err.response.data));
         },
         deleteConfirm: function(){
            let modal = this.$refs.modal;
            $(modal).modal('show');
         }
      }
   }
</script>

<style scoped>
.card{
   min-height: 100%;
}
.card img{
   min-height: 80%;
}
</style>