<template>
   <div>
      <form @submit.prevent="save">
         <div class="form-group">
            <label for="meal">Das Gericht</label>
            <input type="text" v-model="meal" class="form-control" id="meal">
         </div>
         <div class="form-group">
            <label for="ingredient">Beilage oder Zutaten</label>
            <input type="text" v-model="ingredient" class="form-control" id="ingredient">
         </div>
         <div class="form-group">
            <label for="price">Preis</label>
            <input type="text" v-model="price" class="form-control" id="price">
         </div>
         <div class="form-group">
            <label for="img">Foto</label>
            <div class="custom-file">
               <input type="file" class="custom-file-input" accept="image/*" @change="uploadImage">
               <label ref="file_name" class="custom-file-label" for="customFile">Wählen Sie ein Foto</label>
            </div>
         </div>
         <button type="submit" class="btn btn-primary">speichern</button>
      </form>
   </div>
</template>

<script>
   export default {
      data() {
         return {
            meal: '',
            ingredient: '',
            price: '',
            img: '',            
         }
      },
      methods: {
         save() {
            if(this.meal && this.img && this.price){
               const data = new FormData();
               data.append('meal', this.meal);
               data.append('ingredient', this.ingredient);
               data.append('price', this.price);
               data.append('img', this.img);
   
               this.$http.post('slideshow/create', data).then(response => {
                  if(response.data.status == 'success'){
                     this.$emit('saved');
                  } else {
                     this.$bvToast.toast('Ein Fehler ist eingetreten', {
                        variant: 'danger',
                        title: 'Fehlermeldung'
                     });
                  }
               }).catch(err => {console.log(err);})
            } else {
               this.$bvToast.toast('Bitte alle Eingaben eingeben', {
                  variant: 'danger',
                  title:   'Fehlermeldung'
               });
            }
         },
         uploadImage: function(e){
            this.img = e.target.files[0];
            this.$refs.file_name.innerHTML = this.photo.name;
         }
      }
   }
</script>

<style scoped>

</style>