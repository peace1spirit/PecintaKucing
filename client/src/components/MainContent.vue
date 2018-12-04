/* eslint-disable */
<template>
    <div class="col-lg-12 mt-1">
        <div class="card mt-2"  v-for="(article, index) in articles" :key="index">
        <h5 class="card-header">{{ article.title }}</h5>
        <div class="card-body">
            <img class="card-img-top mb-1" v-bind:src="article.imageurl" alt="Card image" style="width: 200px; height:200px">
            <p class="card-text" ><small class="card-text" >{{ formatDate(article.updatedAt) }}({{ article.author.name }}) </small>
             {{ article.description }}</p>
        </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import { mapActions, mapState } from 'vuex'

export default {
    name:'maincontent',
    props:[],
    data(){
        return {
            //articles:null,
        }
    },
    computed: {
    ...mapState(['articles'])
    },
    methods:{
        ...mapActions(['getarticle']),
        formatDate(d) {
          let datetime=new Date(d)
          let date = `${datetime.getDate()}/${datetime.getMonth() + 1}/${datetime.getFullYear()} `
          return date
        },
        refreshArticle(){
            this.$server({
                url:  `/article`,
                method: 'GET'
            })
            .then(({data}) => {
                console.log(data)
                this.articles=data.articles
            })
            .catch((err) => {
                console.log(err)
            });
            
        },
       
    },
    created() {
        this.getarticle()
        //this.refreshArticle()
    },
}
</script>
<style scoped>
.card-text{
    float: none; margin:10px auto ; text-align:left;
}
</style>