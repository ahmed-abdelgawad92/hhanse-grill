<template>
  <div class="row">
    <div class="col-sm-2 col-md-4 col-lg-4"></div>
    <div class="col-sm-8 col-md-4 col-lg-4">
      <h3 class="text-center text-muted my-3">Passwort verändern</h3>
      <form>
        <div class="alert alert-success" v-if="success">{{success}}</div>
        <div class="alert alert-danger" v-if="failed">{{failed}}</div>
        <div class="form-group">
          <label for="oldPassword">Altes Passwort</label>
          <input type="password" @blur="$v.oldPassword.$touch()" :class="{'is-invalid': $v.oldPassword.$error}" v-model.lazy.trim="oldPassword" id="oldPassword" class="form-control" placeholder="Altes Passwort eingeben">
          <div class="invalid-feedback" v-if="!$v.oldPassword.required">Altes Passwort kann nicht leer sein!</div>
        </div>
        <div class="form-group">
          <label for="newPassword">Neues Passwort</label>
          <input type="password" @blur="$v.newPassword.$touch()" :class="{'is-invalid': $v.newPassword.$error}" v-model.lazy.trim="newPassword" id="newPassword" class="form-control" placeholder="Neues Passwort eingeben">
          <div class="invalid-feedback" v-if="!$v.newPassword.required">Neues Passwort kann nicht leer sein!</div>
          <div class="invalid-feedback" v-if="!$v.newPassword.minLength">Neues Passwort kann nicht weniger als 6 Zeichen sein!</div>
        </div>
        <div class="form-group">
          <label for="confirmedPassword">Neues Passwort bestätigen</label>
          <input type="password" @blur="$v.confirmedPassword.$touch()" :class="{'is-invalid': $v.confirmedPassword.$error}" v-model.lazy.trim="confirmedPassword" id="confirmedPassword" class="form-control" placeholder="Neues Passwort wieder eingeben">
          <div class="invalid-feedback" v-if="!$v.confirmedPassword.required">Neues Passwort bestätigen kann nicht leer sein!</div>
          <div class="invalid-feedback" v-if="!$v.confirmedPassword.sameAs">Passwort Bestätigung muss genau wie neues Passwort sein!</div>
        </div>
        <div class="text-center">
          <button @click.prevent="submit($event)" class="btn btn-primary">verändern</button>
        </div>
      </form>
    </div>
    <div class="col-sm-2 col-md-4 col-lg-4"></div> 
  </div>
</template>

<script>
  import axios from 'axios';
  import { required, minLength, sameAs } from 'vuelidate/lib/validators';

  export default {
    data: () => {
      return {
        oldPassword: '',
        newPassword: '',
        confirmedPassword: '',
        success: '',
        failed: ''
      }
    },
    methods: {
      submit: function(event){
        event.target.setAttribute('disabled','disabled');
        this.$v.$touch();
        if(!this.$v.$invalid){
          let data = {
            oldPassword: this.oldPassword,
            newPassword: this.newPassword,
            confirmedPassword: this.confirmedPassword
          };
          axios.post('change_password', data).then(
            response => {
              if(response.data.success){
                this.success = response.data.success;
                this.failed = '';
                setTimeout(()=>{
                  this.$router.push('/admin-panel');
                },2000);
              }
            }
          ).catch(error => {
            if(error.response.data.oldPassword){
              this.failed = error.response.data.oldPassword;
            }
            event.target.removeAttribute('disabled');
            console.log(error.response);
          });
        }else{
          event.target.removeAttribute('disabled');
        }
      }
    },
    validations: {
      oldPassword: {
        required
      },
      newPassword: {
        required: required,
        minLength: minLength(6)
      },
      confirmedPassword: {
        required: required,
        sameAs: sameAs('newPassword')
      }
    }
  }
</script>

<style scoped>

</style>