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
          Das Angebot ist erfolgreich gelöscht !
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <div class="card-title">
          {{item.row_order}} - {{item.meal.name | capitalize}}
          <span class="subtitle">{{item.price}} &euro;</span>
        </div>
        <p class="card-text">
          {{getIngredient()}}
        </p>
        <template v-if="$router.currentRoute.path == '/year-calendar'">
          <button class="btn btn-danger" @click="confirmDeletion">löschen</button>
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
          <button v-if="item.available" class="btn btn-secondary" @click="deactivate">deaktivieren</button>
          <button v-if="!item.available" class="btn btn-primary" @click="activate">aktivieren</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data: () => {
      return {
        success: false
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
              this.success = true;
              setTimeout(() => {
                this.success = false;
              }, 3000);
              this.$emit('getAllIngredientsAndMeals');
              let element = this.$refs['modal'];
              $(element).modal('hide');
            }
          },
          error => {console.log(error)}
        );
      },
      activate: function(){
        this.$emit('activate',this.item.id)
      },
      deactivate: function() {
        this.$emit('deactivate',this.item.id)
      }
    }
  }
</script>

<style scoped>
span.subtitle{
  display: inline-block;
  float: right;
}
</style>