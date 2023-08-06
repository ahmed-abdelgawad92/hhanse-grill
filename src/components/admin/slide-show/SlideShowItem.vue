<template>
   <div>
      <div class="card">
         <img :src="item.img" class="card-img-top" :alt="item.name">
         <div class="card-body">
            <h5 class="card-title">{{item.meal}}</h5>
            <div class="card-text">
               {{item.ingredient}}
               <div class="row">
                  <div class="col-6">
                     <button class="btn btn-primary" @click="edit = !edit">bearbeiten</button>
                  </div>
                  <div class="col-6 text-right">{{item.price | currency}}</div>
               </div>
            </div>
         </div>
      </div>
      <!-- <b-modal v-model="edit" hide-footer>
         item
      </b-modal> -->
   </div>
</template>

<script>
   export default {
      data() {
         return {
            edit: false
         }
      },
      props: ['item'],
      methods: {

      }
   }
</script>

<style scoped>

</style>