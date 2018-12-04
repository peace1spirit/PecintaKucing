/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
const myaxios = axios.create({
  baseURL: 'http://localhost:3000'
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    isLoginAdmin: false,
    iduser: '',
    articles:null,
    userlist:null,
    edituser:null,
    token: localStorage.getItem('token'),
  },
  mutations: {
    STATUS_LOGIN (state, payload) {
      state.isLogin = payload.status
      state.iduser = payload.iduser
    },
    STATUS_LOGINADMIN (state, payload) {
      state.isLoginAdmin = payload.status
      state.iduser = payload.iduser
    },
    SETUSERLIST (state, payload) {
      state.userlist = payload.data
    },
    SETARTICLES (state, payload) {
      state.articles = payload.data
    },
  },
  actions: {
    getarticle ({ commit }, payload){

         myaxios({
            url:  `/article`,
            method: 'GET'
        })
        .then(({data}) => {
            console.log(data)
            commit('SETARTICLES', { data: data.articles })
        })
        .catch((err) => {
            console.log(err)
        });
        
    },
    getuserlist ({ commit }, payload){
      let token=localStorage.getItem('token')
      if(token){
          myaxios.get(`/user/`, {
              headers: { token: token }
          })
          .then(({data}) => {
              console.log('store',data)
              commit('SETUSERLIST', { data: data.data })
          }).catch((err) => {
              console.log(err)
          });
      }
      
    },
    setLogin ({ commit }, payload){
      //console.log('setloginnn',payload)
      commit('STATUS_LOGIN', { status: true, iduser: payload.id })
    },
    setLoginAdmin ({ commit }, payload){
      //console.log('setloginnn',payload)
      commit('STATUS_LOGINADMIN', { status: true, iduser: payload.id })
    },
    checkToken ( context , payload) {
      let token =localStorage.getItem('token')
       if(token){
        myaxios.get(`user/checktoken/`, {
            headers: { token: token }
        })
        .then(({data}) => {
          console.log(data)
          context.commit('STATUS_LOGIN', { status: true, iduser: data.user.id })
        })
        .catch((err) => {
            console.log(err)
        });
      }
    },
    checkTokenAdmin ( context , payload) {
      let token =localStorage.getItem('token')
      console.log('object')
       if(token){
        myaxios.get(`user/checktokenadmin/`, {
            data:{ admin:true },
            headers: { token: token }
        })
        .then(({data}) => {
          console.log(data)
          context.commit('STATUS_LOGINADMIN', { status: true, iduser: data.user.id })
        })
        .catch((err) => {
            console.log(err)
        });
      }
    },
    logout ({ commit }, payload) {
      localStorage.clear()
      commit('STATUS_LOGIN', { status: false, iduser: '' })
      router.push('/')
    },
    logoutadmin ({ commit }, payload) {
      localStorage.clear()
      commit('STATUS_LOGINADMIN', { status: false, iduser: '' })
      router.push('/admin')
    },
  }
})
