<template>
    <div class="modal fade" id="loginadminModal" tabindex="-1" role="dialog" ref="refloginAdminModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Login Admin</h5>
                </div>
                <div class="modal-body">
                    <div v-if="loginAlert" class="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Wrong username / password</strong>
                         <button type="button" class="close" @click=closeAlert()><span aria-hidden="true">&times;</span></button>
                    </div>
                    <form>
                        <div class="form-group">
                            <label>Email address</label>
                            <input v-model="loginInputEmail" type="email" class="form-control" id="loginInputEmail" placeholder="Enter email">
                            <small style="color: red">{{ MsgEmailLogin }}</small>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input v-model="loginInputPassword" type="password" class="form-control" placeholder="Password">
                            <small style="color: red">{{ MsgPasswordLogin }}</small>
                        </div>
                        <button default type="button" class="btn btn-primary btn-default" v-on:click="doLogin" style="margin-right: 10px">Login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions } from 'vuex';
export default {
  name: 'loginmodal',
  props: ['changeStatusLogin'],
  data () {
    return {
      loginAlert: false,
      loginInputEmail: '',
      loginInputPassword: '',
      MsgEmailLogin: '',
      MsgPasswordLogin: ''    
    }
  },
  methods: {  
    ...mapActions(['setLogin']),

    doOnHidden(){
        this.clearLogin()
    },
    clearLogin(){
        this.loginInputEmail = ''
        this.loginInputPassword = ''
        this.clearMsg()       
    },
    clearMsg(){
        this.MsgEmailLogin=''
        this.MsgPasswordLogin=''
    },
    doLogin() {
        this.clearMsg()
        let r = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let result = r.test(this.loginInputEmail)
        if(!result){
            this.MsgEmailLogin='Email address is not valid'
            return
        }
        if(this.loginInputPassword.length<6){
            this.MsgPasswordLogin='Password is not valid, minimum 6 length' 
            return;
        }                

        this.$server.post(`user/login`,{
            email: this.loginInputEmail, 
            password: this.loginInputPassword,
            admin : true
            })
        .then(({data}) => {
            console.log(data)
            if(data.token){
                localStorage.setItem('token', data.token)
                this.setLogin(data.user) 
                this.clearLogin()
                $('#loginadminModal').modal('hide');
            }
        }).catch((err) => {
            this.loginAlert=true
            console.log(err)
        });
    },
    closeAlert(){
          this.loginAlert = false;
    }
  },
  mounted() {  
    $(this.$refs.refloginAdminModal).on("hidden.bs.modal", this.doOnHidden)
  }, 
  created() {
    
  }
}
</script>
