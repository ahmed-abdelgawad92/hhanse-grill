<template>
  <div class="card">
    <div class="row p-3">
      <div class="col-2">
        <img src="../../assets/profile.png" class="card-img" alt="">
      </div>
      <div class="col-10">
        <div class="card-body">
          <div class="card-title">
            <h3>{{user.name | capitalize}}</h3>
          </div>
          <p class="card-text">
            Benutzername: {{user.uname}} 
          </p>
          <p class="card-text">
            Benutzertyp: {{user.admin ? 'Admin' : 'Mitarbeiter'}} 
          </p>
          <button class="btn btn-danger" @click="confirmDelete">löschen</button>
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
                  <p>Sind Sie sicher um den Benutzer <strong>({{user.name | capitalize}})</strong> zu löschen?</p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">abrechen</button>
                  <button type="button" class="btn btn-danger" @click="deleteUser">löschen</button>
                </div>
              </div>
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
    props: ['user'],
    methods: {
      confirmDelete: function(){
        let element = this.$refs['modal'];
        $(element).modal('show');
      },
      deleteUser: function(){
        axios.delete('delete/user/'+this.user.id).then(response => {
          this.$emit('successDelete',response.data.success);
          let element = this.$refs['modal'];
          $(element).modal('hide');
        }).catch(error => {
          console.log(error.response)
        });
      }
    }
  }
</script>

<style scoped>

</style>