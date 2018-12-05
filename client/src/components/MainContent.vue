/* eslint-disable */
<template>
    <div class="container mt-2">
      <div class="row" v-for="(article, index) in articles" :key="index">
        <div class="col-md-12">
            <div class="card flex-md-row mb-2 shadow-sm h-md-250">
                <img class="card-img-left d-flex flex-auto d-none d-lg-block" alt="Thumbnail" v-bind:src="article.imageurl" style="flex-shrink: 0;width: 250px; height: 250px;">
                <div class="card-body d-flex flex-column align-items-start">
                    <h5><strong class="d-inline-block mb-2 text-primary">{{ article.title }}</strong></h5>
                    <div class="mb-1 text-muted small">{{ formatDate(article.updatedAt) }}({{ article.author.name }})</div>
                    <p class="card-text mb-auto" style="" > {{ article.description }}</p>
                    <a v-if="iduser==article.author._id" @click="onDelete(article._id,index)" class="btn btn-outline-primary btn-sm" role="button" >Delete</a>
                </div>    
            </div>
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
        }
    },
    computed: {
    ...mapState(['articles','iduser'])
    },
    methods:{
        ...mapActions(['getarticle','deleteArticle']),
        onDelete(id,index){
            console.log(id)
            //this.deleteArticle(index)
            let token=localStorage.getItem('token')
            this.$server({
                url:  `/article`,
                method: 'DELETE',
                data: { articleid:id },
                headers: { token: token }
            })
            .then(({data}) => {
                this.articles.splice(index, 1);
            })
            .catch((err) => {
                console.log(err)
            });
        },
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
    },
}
</script>
<style scoped>
.card-text{
    text-align:left;
}
</style>