<template>
  <div>
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
    <div class="alert alert-danger" v-if="error">{{error}}</div>
    <div class="card">
      <div class="card-body">
        <div class="card-title">
          <template v-if="edit">
            <div class="row">
              <div class="col-6">
                <select v-model="number" class="form-control" :class="{'is-invalid': $v.number.$error}" @blur="$v.number.$touch()">
                  <option value="1">I</option>
                  <option value="2">II</option>
                  <option value="3">III</option>
                  <option value="4">IV</option>
                </select>
              </div>
              <div class="col-6">
                <input type="text" v-model.trim="price" class="form-control" @blur="$v.price.$touch()" :class="{'is-invalid': $v.price.$error}">
              </div>
              <div class="col-12 mt-2">
                <input type="text" v-model.trim="meal" class="form-control" @blur="$v.meal.$touch()" :class="{'is-invalid': $v.meal.$error}">
              </div>
            </div>
          </template>
          <template v-else>
            {{item.row_order}} - {{item.meal.name | capitalize}}
            <span class="subtitle">{{item.price}} &euro;</span>
          </template>
        </div>
        <div v-if="edit">
          <input type="text" v-model.trim="ingredient" class="form-control my-2">
        </div>
        <p v-else class="card-text">
          {{getIngredient()}}
        </p>
        <span class="text-danger" v-if="!$v.meal.required">Das Gericht kann nicht leer sein</span>
        <span class="text-danger" v-if="!$v.number.required">Die Nummer kann nicht leer sein</span>
        <span class="text-danger" v-if="!$v.number.integer">Die Nummer muss eine Zahl sein</span>
        <span class="text-danger" v-if="!$v.price.required">Der Preis kann nicht leer sein</span>
        <span class="text-danger" v-if="!$v.price.decimal">Der Preis muss eine Zahl sein</span>
        <template v-if="$router.currentRoute.path == '/year-calendar'">
          <button v-if="!edit" class="btn btn-secondary" @click="editShow">bearbeiten</button>
          <button v-else class="btn btn-primary" type="submit" @click.prevent="submitEdit">speichern</button>
          <button v-if="edit" class="btn btn-danger" @click="editShow">abbrechen</button>
          <button v-else class="btn btn-danger" @click="confirmDeletion">löschen</button>
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
                  <p>Sind Sie sicher um das Angebot <strong>({{item.meal.name | capitalize}})</strong> zu löschen?</p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">abrechen</button>
                  <button type="button" class="btn btn-danger" @click="deleteItem">löschen</button>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <button v-if="item.available" class="btn btn-primary" @click="deactivate">deaktivieren</button>
          <button v-if="!item.available" class="btn btn-danger" @click="activate">aktivieren</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import { required, integer, decimal } from 'vuelidate/lib/validators';
  export default {
    data: () => {
      return {
        meal: '',
        ingredient: '',
        number: '',
        price: '',
        success: '',
        error: '',
        edit: false
      }
    },
    props: ['item'],
    methods: {
      getIngredient: function(){
        let ingredient = this.item.ingredients.map(a => a.ingredient).join(', ');
        return ingredient;
      },
      confirmDeletion: function(){
        let element = this.$refs['modal'];
        $(element).modal('show');
      },
      deleteItem: function(){
        axios.delete('delete_menu_item/' + this.item.id).then(
          response => {
            if(response.data.success){
              this.success = 'Das Angebot ist erfolgreich gelöscht !';
              setTimeout(() => {
                this.success = '';
              }, 3000);
              this.$emit('getAllIngredientsAndMeals');
              let element = this.$refs['modal'];
              $(element).modal('hide');
            }
          },
          error => {console.log(error)}
        );
      },
      submitEdit: function(){
        this.$v.$touch();
        if(!this.$v.$invalid){
          const data = {
            meal: this.meal,
            ingredient: this.ingredient,
            price: this.price,
            order: this.number
          };
          axios.put('edit_menu/' + this.item.id, data).then(response => {
            this.success = response.data.success;
            this.edit = false;
            setTimeout(() => {
              this.success = '';
            }, 3000);
            this.$emit('getAllIngredientsAndMeals');
          }).catch(err=>{this.error = err.response.data.error});
        }
      },
      activate: function(){
        this.$emit('activate',this.item.id)
      },
      deactivate: function() {
        this.$emit('deactivate',this.item.id)
      },
      editShow: function(){
        this.edit = !this.edit;
        this.meal= this.item.meal.name;
        this.ingredient= this.getIngredient();
        this.number= this.item.row_order;
        this.price= this.item.price;
      }
    },
    created: function(){
      this.meal= this.item.meal.name;
      this.ingredient= this.getIngredient();
      this.number= this.item.row_order;
      this.price= this.item.price;
    },
    validations: {
      number:{
        required,
        integer
      },
      price: {
        required,
        decimal
      },
      meal: {
        required
      }
    }
  }
</script>

<style scoped>
span.subtitle{
  display: inline-block;
  float: right;
}
span.text-danger{
  display: block;
  font-size: 14px;
}
span.text-danger:last-of-type{
  margin-bottom: 5px;
}
</style>