/* eslint-disable */
<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light">
            <a class="navbar-brand" href="#">Pecinta Kucing</a>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <router-link to="/" class="nav-link" href="#">Home
                            <span class="sr-only">(current)</span>
                        </router-link>
                    </li>
                    <li class="nav-item"  >
                        <router-link to="/admin" class="nav-link" href="#">Admin
                            <span class="sr-only"></span>
                        </router-link>
                    </li>
                </ul>
                <div class="form-inline my-2 my-lg-0">
                    <span v-if="isLogin" class="login" >
                        <button  class="btn btn-outline-primary mr-2 addtask" data-toggle="modal" data-target="#addArticleModal" type="button">Add Article</button>
                        <router-link to="/profile" type="button" class="btn btn-outline-primary mr-2 circle"> <i class="fas fa-user-circle" style="font-size:20px"></i></router-link>
                        <button class="btn btn-outline-primary logout" type="button" @click="doLogout">Logout</button>
                    </span>
                    <div v-if="!isLogin" class="notlogin">
                        <button class="btn btn-outline-primary mr-2 login" data-toggle="modal" data-target="#loginModal" type="button">Login</button>
                        <button class="btn btn-outline-primary mr-2 register" data-toggle="modal" data-target="#registerModal" type="button">Register</button>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
/* eslint-disable */
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Navbar',
  props: [],
  data () {
    return {
    }
  },
  methods: {
    ...mapActions(['logout', 'checkToken','setLogin']),
    doLogout(){
        this.logout();
    },

  },
  computed: {
    ...mapState(['isLogin'])
  },
  mounted() {  

  }, 
  created() {
      
    this.checkToken()
    // console.log('navbar',this)
  }
}
</script>

<style scoped>
.navbar {
  background-image: linear-gradient(to right, rgb(91, 134, 229), rgb(54, 209, 220));
}
.btn-outline-primary{
    color: black
}
.navbar-light .navbar-nav .nav-link {
    color: black
}
</style>