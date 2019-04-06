<template>
  <div class="row">
    <div class="col-sm-2 col-md-4 col-lg-4"></div>
    <div class="col-sm-8 col-md-4 col-lg-4">
      <h3>HHanse Grill Verwaltung</h3>
      <form>
        <div class="alert alert-danger" v-if="loginError">Benutzername oder Passwort stimmt nicht!</div>
        <div class="form-group">
          <label for="uname">Benutzername</label>
          <input type="text" name="uname" id="uname" class="form-control" placeholder="Bitte Benutzername eingeben" @blur="$v.uname.$touch()" v-model.trim="uname" :class="{'is-invalid': $v.uname.$error}">         
          <div class="invalid-feedback" v-if="!$v.uname.required">Benutzername kann nicht leer sein!</div>
        </div>
        <div class="form-group">
          <label for="uname">Passwort</label>
          <input type="password" name="pass" id="pass" class="form-control" placeholder="Bitte Passwort eingeben" @blur="$v.pass.$touch()" v-model.trim="pass" :class="{'is-invalid': $v.pass.$error}"> 
          <div class="invalid-feedback" v-if="!$v.pass.required">Passwort kann nicht leer sein!</div>
          <div class="invalid-feedback" v-if="!$v.pass.minLength">Passwort kann nicht weniger als 6 Zeichen sein!</div>
        </div>
        <button type="submit" @click="submit($event)" class="btn btn-primary">Einloggen</button>
      </form>
    </div>
    <div class="col-sm-2 col-md-4 col-lg-4"></div> 
  </div>
</template>

<script>
  import axios from 'axios';
  import JWT from '../../jwt.js';
  import { required, minLength } from 'vuelidate/lib/validators';

  export default {
    data: () => {
      return {
        uname: '',
        pass: '',
        loginError: false
      }
    },
    methods: {
      submit: function(event){
        event.target.setAttribute('disabled','disabled');
        this.$v.$touch();
        if(!this.$v.$invalid){
          let credintials = {
            uname: this.uname,
            password: this.pass
          };
          axios.post('login', credintials).then(
            response => {
              // console.log(response);
              JWT.saveToken(response.data.access_token); 
              if(this.$route.query.nextUrl != null){
                this.$router.push(this.$route.query.nextUrl);         
              }else{
                this.$router.push('/admin-panel');
              }
            },
            error => {
              //console.log(error);
              this.loginError = true;
              event.target.removeAttribute('disabled');
            }
          );
        }else{
          event.target.removeAttribute('disabled');
        }
      }
    },
    validations: {
      uname: {
        required
      },
      pass: {
        required: required,
        minLength: minLength(6)
      }
    }
  }
</script>

<style scoped>
h3{
  margin-top: 40px;
  text-align: center;
}
</style>