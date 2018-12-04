/* eslint-disable */
<template>
    <div class="col-lg-10 mt-2">
        <div class="card mt-2"  v-for="(article, index) in articles" :key="index">
        <h5 class="card-header">{{ article.title }}</h5>
        <div class="card-body">
            <img class="card-img-top mb-1" v-bind:src="article.imageurl" alt="Card image" style="width: 200px; height:200px">
            <p class="card-text" >{{ article.description }}</p>
        </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
/* eslint-disable */
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
        this.refreshArticle()
    },
}
</script>
<style scoped>
.card-text{
    float: none; margin:10px 0 10px 0; text-align:center;
}
</style>