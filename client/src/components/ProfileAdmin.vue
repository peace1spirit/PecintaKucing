<template>
  <div class="content" v-if="user!=null" style="width:250px; margin: 0 auto">
    <div v-if="editAlert" class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Register fail, email already exist</strong>
        <button type="button" class="close" > <span aria-hidden="true">&times;</span></button>
    </div>
        <div class="form-group">
        <label>Name </label>
        <input v-model="user.name" type="text" class="form-control" placeholder="Enter  Name">
        <small style="color: red">{{ MsgFirstNameReg }}</small>
    </div>
    <div class="form-group">
        <label>Email address</label>
        <input v-model="user.email" type="email" class="form-control" placeholder="Enter email">
        <small style="color: red">{{ MsgEmailReg }}</small>
    </div>
    <div class="form-group">
        <label>Password</label>
        <input v-model="newpassword" type="password" class="form-control"  placeholder="Password">
        <small style="color: red">{{ MsgPasswordReg }}</small>
    </div>
    <button type="button" class="btn btn-primary" v-on:click="doUpdateUser" default>Edit Profile</button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
/* eslint-disable */
export default {
    name:'profile',
    props:['changeStatusLogin','isLogin'],
    data() {
        return {
            editAlert: false,
            user: null,
            tuser: null,
            newpassword:'' ,
            MsgFirstNameReg: '',
            MsgEmailReg: '',
            MsgPasswordReg: ''
        }
    },
    methods: {
        ...mapActions(['logout', 'checkToken']),
        doUpdateUser() {
            let r = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            let result = r.test(this.user.email)
            if(!result){
                this.MsgEmailReg='Email address is not valid'
                return
            }
            if(this.newpassword.length<6 && this.newpassword.length>=1 ){
                this.MsgPasswordReg='Password is not valid, minimum 6 length' 
                return;
            }  
            let token=localStorage.getItem('token')
            let self=this
            console.log(this.user.email)
            this.$server.put(`/user/`, {
                name: this.user.name,
                email: this.user.email,
                password: this.newpassword
            },
            {
                headers: { token: token }
            })
            .then(({data}) => {
                console.log(this.tuser.email)
                if(this.user.email!==this.tuser.email)
                    this.logout()
                console.log(data)
                
            }).catch((err) => {
                this.editAlert= true;
                console.log(err)
            });
        },
        closeAlert(){
          this.editAlert = false;
        }
    },
    created() {
        console.log('create')
        let token=localStorage.getItem('token')
        if(token){
            this.$server.get(`/user/checktokenadmin`, {
                headers: { token: token }
            })
            .then(({data}) => {
                this.user=data.user
                this.tuser= Object.assign({},data.user)
            }).catch((err) => {
                console.log(err)
            });
        }
    },
}
</script>
