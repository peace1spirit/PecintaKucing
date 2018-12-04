<template>
  <div class="home">
    <addarticlemodal></addarticlemodal>
    <navbar></navbar>
    <loginmodal></loginmodal>
    <registermodal></registermodal>
    <maincontent v-if="$route.path=='/'"></maincontent>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import navbar from '@/components/Navbar.vue'
import loginmodal from '@/components/LoginModal.vue'
import registermodal from '@/components/RegisterModal.vue'
import profile from '@/components/Profile.vue'
import maincontent from '@/components/MainContent.vue'
import addarticlemodal from '@/components/AddArticleModal.vue'

export default {
  name: 'home',
  components: {
    navbar,
    loginmodal,
    registermodal,
    profile,
    maincontent,
    addarticlemodal
  }
}
</script>
