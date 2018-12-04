<template>
    <div class="modal fade"  id="edituserModal" tabindex="-1" role="dialog" aria-hidden="true" ref="edituserModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit user</h5>
                    <button type="button" class="close" data-dismiss="modal">
                    <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div v-if="regAlert" class="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Edit fail, email already exist</strong>
                        <button type="button" class="close" @click=closeAlert() > <span aria-hidden="true">&times;</span></button>
                    </div>
                    <form>
                        <div class="form-group">
                            <label>Name </label>
                            <input v-if="user!=null" v-model="user.name" type="text" class="form-control" id="edInputName" placeholder="Enter Name">
                            <small style="color: red">{{ MsgNameReg }}</small>
                        </div>
                        <div class="form-group">
                            <label>Email address</label>
                            <input v-if="user!=null" v-model="user.email" type="email" class="form-control" id="edInputEmail"  placeholder="Enter email">
                            <small style="color: red">{{ MsgEmailReg }}</small>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input  v-if="user!=null" v-model="newpassword" type="password" class="form-control" id="edInputPassword" placeholder="Password">
                            <small style="color: red">{{ MsgPasswordReg }}</small>
                        </div>
                        <button type="button" class="btn btn-primary" v-on:click="doEdit" default>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name:'registermodal',
    props: [],
    data() {
        return {
            regAlert: false,
            user: null,
            tuser: null,
            newpassword:'' ,
            MsgNameReg: '',
            MsgEmailReg: '',
            MsgPasswordReg: ''
        }
    },
    methods: {
        doOnHidden(){
            this.clearReg()
        },
        clearReg(){
            this.clearMsg()
        },
        clearMsg(){
            this.regAlert= false
            this.MsgNameReg= ''
            this.MsgEmailReg= ''
            this.MsgPasswordReg= ''
        },
        doEdit() {
            
            this.clearMsg()
            let r = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            let result = r.test(this.user.email)
            if(!result){
                this.MsgEmailReg='Email address is not valid'
                return
            }
            if(this.newpassword.length<6 && this.newpassword.length>=1){
                this.MsgPasswordReg='Password is not valid, minimum 6 length' 
                return;
            } 
            let token=localStorage.getItem('token')
            if(token){                    
                this.$server.put(`/user/`, {
                    name: this.user.name,
                    email: this.user.email,
                    password: this.newpassword
                },
                {
                    headers: { token: token }
                })
                .then(({data}) => {
                    $('#edituserModal').modal('hide');
                    this.$emit('parent-refresh')
                }).catch((err) => {
                    this.regAlert= true;
                    console.log(err)
                });
            }
        },
        closeAlert(){
          this.regAlert = false;
        }
    },
    mounted() {  
        $(this.$refs.edituserModal).on("hidden.bs.modal", this.doOnHidden)
    }, 
    created() {
        let token=localStorage.getItem('token')
        if(token){
            this.$server.get(`/user/checktoken`, {
                headers: { token: token }
            })
            .then(({data}) => {
                this.user=data.user
                this.tuser= Object.assign({},data.user)
            }).catch((err) => {
                console.log(err)
            });
        }
    }


}
</script>
