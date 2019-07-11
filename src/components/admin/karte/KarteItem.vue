<template>
<form :class="{'is-invalid': $v.$anyError}">
  <div v-if="success" style="position: fixed; top: 20px; right: 20px; z-index:100;">
    <div class="toast fade show" data-delay="3000" style="width:350px" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header text-success ">
        <strong class="mr-auto">Erfolgreiche Meldung</strong>
        <small class="text-muted">just now</small>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        {{success}}
      </div>
    </div>
  </div>
  <div class="alert alert-danger mt-2" v-if="error">{{error}}</div>
  <div v-if="item.photo" ref="imageModal" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{item.meal}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
          <img :src="$domain+path" class="img-r" alt="">
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">schließen</button>
        </div>
      </div>
    </div>
  </div>
  <div class="py-3 row">
    <div class="col-1">
      <div class="form-group" v-if="edit">
        <input type="text" class="form-control" 
               v-model.trim="number"
               @blur="$v.number.$touch()"
               :class="{'is-invalid':$v.number.$error}"
               placeholder="Nummer">
      </div>
      <template v-else>
      {{item.number | articleNum}}.
      </template>
    </div>
    <div class="col-3">
      <div class="form-group" v-if="edit">
        <input type="text" class="form-control" 
               v-model.trim="meal"
               @blur="$v.meal.$touch()"
               :class="{'is-invalid':$v.meal.$error}"
               placeholder="Gericht">
      </div>
      <strong v-else>{{item.meal}}</strong>
    </div>
    <div class="col-3 text-muted">
      <div class="form-group" v-if="edit">
        <input type="text" class="form-control" 
               v-model.trim="ingredient"
               placeholder="Beilage oder Zutaten">
        <br>
        <label for="">Reihenfolge</label>
        <input type="text" class="form-control" v-model.trim="order" placeholder="Reihenfolge">
      </div>
      <template v-else>
        {{item.ingredient}}
      </template>
    </div>
    <div class="col-1">
      <div class="form-group" v-if="edit">
        <input type="text" class="form-control" 
               v-model.trim="price"
               @blur="$v.price.$touch()"
               :class="{'is-invalid':$v.price.$error}"
               placeholder="Preis">
      </div>
      <template v-else>
        {{item.price | currency}}
      </template>
    </div>
    <!-- <div class="col-4">
      <img v-if="item.photo" :src="'http://localhost:8000/'+path" alt="">
    </div> -->
    <div class="col-4">
      <button v-if="edit" type="submit" @click.prevent="editItem" class="btn btn-primary">speichern</button>
      <button v-else type="button" @click.prevent="edit=true" class="btn btn-secondary">bearbeiten</button>
      <button v-if="edit" type="button" @click.prevent="cancel" class="btn btn-danger">abbrechen</button>
      <button v-else type="button" @click.prevent="deleteConfirm" class="btn btn-danger">löschen</button>
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
              <p>Sind Sie sicher um das Gericht <strong>({{item.number | articleNum}} {{item.meal}})</strong> zu löschen?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">abrechen</button>
              <button type="button" class="btn btn-danger" @click="deleteItem">löschen</button>
            </div>
          </div>
        </div>
      </div>
      <span class="upload-img">
        <input type="file" class="photo-file" accept="image/*" @change="uploadImage($event)">
        <img class="img-btn" src="../../../assets/add_photo.png" alt="">
      </span>
      <span class="open-img" v-if="item.photo">
        <img class="img-btn mt-1" src="../../../assets/show_photo.png" @click="showPhoto">
      </span>
    </div>
  </div>
  <span class="invalid-feedback" v-if="!$v.price.required">Der Preis kann nicht leer sein.</span>
  <span class="invalid-feedback" v-if="!$v.price.decimal">Der Preis muss eine Zahl sein.</span>
  <span class="invalid-feedback" v-if="!$v.meal.required">Das Gericht kann nicht leer sein.</span>
  <span class="invalid-feedback" v-if="!$v.number.required">Die Nummer kann nicht leer sein.</span>
  <span class="invalid-feedback" v-if="!$v.number.integer">Die Nummer muss ein Zahl sein.</span>
</form>
</template>

<script>
  import { required, integer, decimal } from 'vuelidate/lib/validators';
  import axios from 'axios';
  export default {
    data: () => {
      return {
        meal: '',
        ingredient: '',
        price: '',
        number: '',
        order: '',
        edit: false,
        success: '',
        error: ''
      }
    },
    props: ['item'],
    computed: {
      path: function(){
        let path = 'storage/' + this.item.photo.split('/')[1];
        return path;
      }
    },
    methods: {
      editItem: function(){
        this.$v.$touch();
        this.error = '';
        if(!this.$v.$invalid){
          const data = {
            number: this.number,
            meal: this.meal, 
            ingredients: this.ingredient, 
            price: this.price, 
            item_order: this.order, 
          };
          axios.put('karte/edit/'+this.item.id, data).then(response => {
            this.success = response.data.success;
            this.edit = false;
            this.item.number = this.number;
            this.item.meal = this.meal;
            this.item.ingredient = this.ingredient;            
            this.item.price = this.price;
            this.item.order_item = this.order;
            setTimeout(()=>{
              this.success = '';
            }, 3000);
          }).catch(err => {
            if(err.response.data.message){
              this.error = "Die eingegebene Daten sind ungültig";
              if(err.response.data.errors.number){
                this.error += '. Die Nummer existiert schon in Datenbank!';
              }
            }else{
              this.error = err.response.data.error;
            }
          });
        }
      },
      cancel: function(){
        this.edit = false;
        this.error = false;
        this.$v.$reset();    
      },
      deleteConfirm: function(){
        $(this.$refs.modal).modal('show');
      },
      deleteItem: function(){
        axios.delete('karte/delete/' + this.item.id).then(response => {
          this.success = response.data.success;
          $(this.$refs.modal).modal('hide');
          this.$destroy();
          this.$el.parentNode.removeChild(this.$el);
          setTimeout(()=>{ this.success = '';}, 3000);
        }).catch(err => { console.log(err); });
      },
      showPhoto: function(){
        if(this.item.photo){
          $(this.$refs.imageModal).modal('show');
        }
      },
      uploadImage: function(e){
        let photo = e.target.files[0];
        let data = new FormData();
        data.append('photo', photo);
        axios.post('karte/upload_photo/' + this.item.id, data).then(response => {
          this.success = response.data.success;
          setTimeout(()=>{this.success = ''}, 3000);
        }).catch(err => {
          if(err.response.data.message){
            this.error = "Die eingegebene Daten sind ungültig";
            if(err.response.data.errors.photo){
              this.error += '. Das Foto ist kein gültiges Foto!';
            }
          }else{
            this.error = err.response.data.error;
          }
        });
      }
    },
    created(){
      this.meal = this.item.meal;
      this.ingredient = this.item.ingredient;
      this.price = this.item.price;
      this.number = this.item.number;
      this.order = this.item.item_order;
    },
    validations: {
      number: {
        required,
        integer
      },
      meal: {
        required
      },
      price: {
        required,
        decimal
      }
    }
  }
</script>

<style scoped>
.row{
  margin-left: 0;
  margin-right: 0;
}
.row:hover{
  background-color: #e3e3e3;
}
.form-group{
  margin-bottom: 0;
}
.is-invalid span.invalid-feedback{
  display: block;
  font-size: 12px;
  margin-left: 15px;
}
span.invalid-feedback:last-child{
  margin-bottom: 10px;
}
.img-btn{
  width: 30px;
  height: 30px;
  margin-left: 5px;
  cursor: pointer;
}
.photo-file{
  cursor: pointer;
  opacity: 0;
  width: 30px;
  height: 30px;
  z-index: 10;
  position: absolute;
}
.open-img{
  margin-left: 10px;
  position: relative;
  z-index: 20;
}
.img-r{
  width: 100%;
}
</style>