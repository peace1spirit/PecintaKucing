<template>
  <div class="admin">
    <navbaradmin></navbaradmin>
    <loginadminmodal></loginadminmodal>
    <registeradminmodal></registeradminmodal>
    <addarticlemodal></addarticlemodal>
    <userlist v-if="$route.path=='/admin' || $route.path=='/admin/'" > ></userlist>
    <router-view/>
  </div>
</template>

<script>
/* eslint-disable */
// @ is an alias to /src
import navbaradmin from '@/components/NavbarAdmin.vue'
import loginadminmodal from '@/components/LoginAdminModal.vue'
import registeradminmodal from '@/components/RegisterAdminModal.vue'
import userlist from '@/components/UserList.vue'
import addarticlemodal from '@/components/AddArticleModal.vue'

export default {
  name: 'admin',
  components: {
    navbaradmin,
    loginadminmodal,
    registeradminmodal,
    userlist,
    addarticlemodal
  }
}
</script>




