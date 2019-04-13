<template>
  <div class="container my-5">
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
    <form class="w-75 mx-auto">
      <div class="form-group row">
        <label for="number" class="col-3">Nummer</label>
        <div class="col-9">
          <input type="text" class="form-control" 
              v-model.trim="number"
              @blur="$v.number.$touch()"
              :class="{'is-invalid': $v.number.$error}"
              placeholder="Bitte die Nummer eingeben">
          <div class="invalid-feedback" v-if="!$v.number.required">Die Nummer kann nicht leer sein</div>
          <div class="invalid-feedback" v-if="!$v.number.integer">Die Nummer muss eine richtige Zahl sein</div>
        </div>
      </div>
      <div class="form-group row">
        <label for="category" class="col-3">Abteilung</label>
        <div class="col-9">
          <select class="form-control" v-model="category" @blur="$v.category.$touch()" :class="{'is-invalid': $v.category.$error}">
            <option value="">Wählen Sie zu welcher Abteilung das Gericht gehört</option>
            <option value="Super-Spar-Menüs">Super-Spar-Menüs</option>
            <option value="Croque">Croque</option>
            <option value="Klassiker">Klassiker</option>
            <option value="Grillgerichte">Grillgerichte</option>
            <option value="Snacks">Snacks</option>
            <option value="Beilagen">Beilagen</option>
            <option value="Salate">Salate</option>
            <option value="Fisch">Fisch</option>
          </select>
          <div class="invalid-feedback" v-if="!$v.category.required">Die Abteilung kann nicht leer sein</div>
        </div>
      </div>
      <div class="form-group row">
        <label for="meal" class="col-3">Das Gericht</label>
        <div class="col-9">
          <input type="text" class="form-control" 
              v-model.trim="meal"
              @blur="$v.meal.$touch()"
              :class="{'is-invalid': $v.meal.$error}"
              placeholder="Bitte das Gericht eingeben">
          <div class="invalid-feedback" v-if="!$v.meal.required">Das Gericht kann nicht leer sein</div>
        </div>
      </div>
      <div class="form-group row">
        <label for="ingredients" class="col-3">Beilage oder Zutaten</label>
        <div class="col-9">
          <input type="text" class="form-control" v-model.trim="ingredients"
          placeholder="Bitte die Beilage eingeben">
        </div>
      </div>
      <div class="form-group row">
        <label for="price" class="col-3">Preis</label>
        <div class="col-9">
          <input type="text" class="form-control" 
              v-model.trim="price"
              @blur="$v.price.$touch()"
              :class="{'is-invalid': $v.price.$error}"
              placeholder="Bitte den Preis eingeben">
          <div class="invalid-feedback" v-if="!$v.price.required">Die Preis kann nicht leer sein</div>
          <div class="invalid-feedback" v-if="!$v.price.decimal">Die Preis muss eine richtige Zahl sein</div>
        </div>
      </div>
      <div class="form-group row">
        <label for="photo" class="col-3">Foto</label>
        <div class="col-9">
          <div class="custom-file">
            <input type="file" class="custom-file-input" accept="image/*" @change="uploadImage">
            <label ref="file_name" class="custom-file-label" for="customFile">Wählen Sie ein Foto, wenn Sie möchten</label>
          </div>
        </div>
      </div>
      <div class="text-center">
        <button type="submit" @click.prevent="addItem($event)" class="btn btn-primary">hinzufügen</button>
      </div>
    </form>
  </div>
</template>

<script>
  import { required, integer, decimal } from 'vuelidate/lib/validators';
  import axios from 'axios';
  export default {
    data: () => {
      return {
        number: '',
        category: '',
        meal: '',
        ingredients: '',
        price: '',
        photo: '',
        error: '',
        success: ''
      }
    },
    methods:{
      addItem: function(event){
        this.error = '';
        this.success = '';
        event.target.setAttribute('disabled', 'disabled');
        this.$v.$touch();
        if(!this.$v.$invalid){
          const data = new FormData();
          data.append('number', this.number);
          data.append('category', this.category);
          data.append('meal', this.meal);
          data.append('ingredients', this.ingredients);
          data.append('price', this.price);
          data.append('photo', this.photo);
          axios.post('karte/add',data).then(response => {
            this.success = response.data.success;
            this.error = '';
            event.target.removeAttribute('disabled');
            this.resetForm();
          }).catch(err => {
            if(err.response.data.message){
              this.error = "Die eingegebene Daten sind ungültig";
              if(err.response.data.errors.number){
                this.error += '. Die Nummer existiert schon in Datenbank!';
              }
              if(err.response.data.errors.photo){
                this.error += '. Die Datei ist kein gültiges Foto!';
              }
            }else{
              this.error = err.response.data.error;
            }
            this.success = '';
            console.log(err.response);
            event.target.removeAttribute('disabled');
          });
        }else{
            event.target.removeAttribute('disabled');
        }
      },
      resetForm: function(){
        this.number = '';
        this.category = '';
        this.meal = '';
        this.price = '';
        this.ingredients = '';
        this.photo = '';
        this.$refs.file_name.innerHTML = '';
        this.$v.$reset();
      },
      uploadImage: function(e){
        this.photo = e.target.files[0];
        this.$refs.file_name.innerHTML = this.photo.name;
      }
    },
    validations: {
      meal: {
        required
      },
      number: {
        required,
        integer
      },
      category: {
        required
      },
      price: {
        required,
        decimal
      },
    
    }
  }
</script>

<style scoped>

</style>