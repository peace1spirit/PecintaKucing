/* eslint-disable */
<template>
  <div class="content" v-if="users!=null" style="width:800px; margin: 20px 50px">

      <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Password</th>
                    <th scope="col">Role</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="index">
                    <th scope="row">{{ index +1 }}</th>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.password }}</td>
                    <td>{{ user.role }}</td>
                    <td><button @click=doEditUser(user._id,index)  data-toggle="modal" data-target="#editUserModal">Edit</button> </td>
                    <td><button @click=doDeleteUser(user._id,index)>Delete</button></td>
                </tr>
            </tbody>
        </table>
        <editusermodal @parent-refresh="refresh"></editusermodal>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import editusermodal from '@/components/EditUserModal.vue'

export default {
    name:'userlist',
    props:[],
     components: {
        editusermodal
    },
    data() {
        return {
            editAlert: false,
            users: null,
            tuser: null,
            newpassword:'' ,
            MsgFirstNameReg: '',
            MsgEmailReg: '',
            MsgPasswordReg: ''
        }
    },
    computed: {
        ...mapState(['userlist'])
    },
    methods: {
        ...mapActions(['logout', 'checkToken', 'getuserlist']),

        refresh(){
            let token=localStorage.getItem('token')
            if(token){
                this.$server.get(`/user/`, {
                    headers: { token: token }
                })
                .then(({data}) => {
                    console.log(data)
                    this.users=data.data
                }).catch((err) => {
                    console.log(err)
                });
            }
        },
        doEditUser(id,index) {
            $('#edituserModal').modal('show');       
        },
        doDeleteUser(id,index){
            console.log(id,index)
            let token= localStorage.getItem('token')
            if (token) {
                axios({
                    url: `http://localhost:3000/user/${id}`,
                    method: 'DELETE',
                    data:{
                        id:id
                    },
                    headers: {
                        token: token
                    }
                })
                .then(({data}) => {
                    console.log(data) 
                    this.users.splice(index,1) //delete local 
                })
                .catch((err) => {
                    console.log(JSON.stringify(err))
                })
            }
            else{
                this.logout()
            }
        },
        doUpdateUser() {
           
        },

    },
    mounted() {
        let token=localStorage.getItem('token')
        if(token){
            this.$server.get(`/user/`, {
                headers: { token: token }
            })
            .then(({data}) => {
                console.log(data)
                this.users=data.data
            }).catch((err) => {
                console.log(err)
            });
        }
    },
}
</script>
