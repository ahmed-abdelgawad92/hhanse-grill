<template>
  <div class="container my-3">
    <h3 class="text-center text-muted my-3">Neuer Benutzer erstellen</h3>
    <form>
      <div class="alert alert-success" v-if="success">{{success}}</div>
      <div class="form-group row">
        <label for="name" class="col-sm-2 col-form-label">Name</label>
        <div class="col-sm-10">
          <input v-model.lazy.trim="name" @blur="$v.name.$touch()" :class="{'is-invalid': $v.name.$error}" type="text" class="form-control" id="name" placeholder="Name eingeben">
          <div class="invalid-feedback" v-if="!$v.name.required">Name kann nicht leer sein!</div>
          <div class="invalid-feedback" v-if="!$v.name.minLength">Name kann nicht weniger als 3 Zeichen sein!</div>
        </div>
      </div>
      <div class="form-group row">
        <label for="uname" class="col-sm-2 col-form-label">Benutzername</label>
        <div class="col-sm-10">
          <input v-model.lazy.trim="uname" @blur="$v.uname.$touch()" :class="{'is-invalid': $v.uname.$error}" type="text" class="form-control" id="uname" placeholder="Benutzername eingeben">
          <div class="invalid-feedback" v-if="!$v.uname.required">Benutzername kann nicht leer sein!</div>
          <div class="invalid-feedback" v-if="!$v.uname.minLength">Benutzername kann nicht weniger als 3 Zeichen sein!</div>
          <div class="invalid-feedback" v-if="!$v.uname.isUnique">Benutzername existiert schon, bitte schreiben Sie anderen Benutzername!</div>
        </div>
      </div>
      <div class="form-group row">
        <label for="password" class="col-sm-2 col-form-label">Passwort</label>
        <div class="col-sm-10">
          <input v-model.lazy.trim="password" @blur="$v.password.$touch()" :class="{'is-invalid': $v.password.$error}" type="password" class="form-control" id="password" placeholder="Passwort eingeben">
          <div class="invalid-feedback" v-if="!$v.password.required">Passwort kann nicht leer sein!</div>
          <div class="invalid-feedback" v-if="!$v.password.minLength">Passwort kann nicht weniger als 6 Zeichen sein!</div>
        </div>
      </div>
      <div class="form-group row">
        <label for="confirmedPassword" class="col-sm-2 col-form-label">Passwort bestätigen</label>
        <div class="col-sm-10">
          <input v-model.lazy.trim="confirmedPassword" @blur="$v.confirmedPassword.$touch()" :class="{'is-invalid': $v.confirmedPassword.$error}" type="password" class="form-control" id="confirmedPassword" placeholder="Passwort wieder eingeben">
          <div class="invalid-feedback" v-if="!$v.confirmedPassword.required">Passwort bestätigen kann nicht leer sein!</div>
          <div class="invalid-feedback" v-if="!$v.confirmedPassword.sameAs">Passwort Bestätigung muss genau wie Passwort sein!</div>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Benutzertyp</label>
        <div class="col-sm-10">
          <input type="radio" id="admin" value="1" name="utype" v-model="utype">
          <label class="mt-2" for="admin">Admin</label> &nbsp;&nbsp;
          <input type="radio" id="user" value="0" name="utype" v-model="utype">
          <label class="mt-2" for="user">User</label>
        </div>
      </div>
      <div class="text-center">
        <button class="btn btn-primary" @click.prevent="submit($event)">erstellen</button>
      </div>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';
  import { required, minLength, sameAs } from 'vuelidate/lib/validators';

  export default {
    data: () => {
      return {
        name: '',
        uname: '',
        password: '',
        confirmedPassword: '',
        utype: 0,
        success: ''
      }
    },
    methods:{
      submit: function(event){
        event.target.setAttribute('disabled','disabled');
        this.$v.$touch();
        if(!this.$v.$invalid){
          let data = {
            name: this.name,
            uname: this.uname,
            password: this.password,
            confirmedPassword: this.confirmedPassword,
            utype: this.utype
          };
          axios.post('register',data).then(response => {
            this.success = response.data.success;
            setTimeout(()=>{
              this.success = '';
              this.name = '';
              this.uname = '';
              this.password = '';
              this.confirmedPassword = '';
              this.utype = 0;
              event.target.removeAttribute('disabled');
              this.$v.$reset();
            },2000);
          }).catch(error => {
            event.target.removeAttribute('disabled');
            console.log(error.response);
          });
        }else{
          event.target.removeAttribute('disabled');
        }
      }
    },
    validations: {
      name: {
        required,
        minLength: minLength(3)
      },
      uname: {
        required,
        minLength: minLength(3),
        isUnique(value){
          if(value==''){
            return true;
          }
          return new Promise((resolve, reject)=>{
            axios.get('unique/'+value).then(response => {
              resolve(response.data.unique == true);
            }).catch(error => {
              reject(false);
            });
          }); 
        }
      },
      password: {
        required,
        minLength: minLength(6)
      },
      confirmedPassword: {
        required,
        sameAs: sameAs('password')
      }
    }
  }
</script>

<style scoped>

</style>