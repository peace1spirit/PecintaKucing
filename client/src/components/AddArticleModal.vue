<template>
    <div class="modal fade" id="addArticleModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add Article</h5>
                    <button type="button" class="close" data-dismiss="modal">
                    <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label>Title  Article</label>
                            <input v-model="articleInputTitle" type="text" class="form-control" placeholder="Enter Title">
                        </div>
                        <div class="form-group">
                            <label>Description </label>
                            <textarea class="form-control" v-model="articleInputDescription" rows="3" placeholder="Enter Description"></textarea>
                        </div>
                        <div class="form-group">
                            <label>Image </label>
                            <input type="file" v-modal="articleInputImage" v-on:change="getImage" class="form-control" id="file" ref="file" placeholder="Enter Image">
                        </div>
                        <button type="button" class="btn btn-primary" v-on:click="doAddTask" default>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import { mapActions, mapState } from 'vuex';
export default {
    name:'addarticle',
    data(){
        return {
            articleInputTitle: '',
            articleInputDescription: '',
            articleInputImage: '',
            imageupload: ''
        }
    },
    methods:{
        ...mapActions(['getarticle']),
        getImage(){
            this.imageupload = this.$refs.file.files[0] 
        },
        clearArticle(){
            this.articleInputTitle= ''
            this.articleInputDescription= ''
            this.articleInputImage= ''
            this.imageupload= ''
            $('#file').val(''); 
            //this.$refs.file.files.length=0
        },
        doAddTask(){
            let token = localStorage.getItem('token')
            let uploaddata = new FormData()
            uploaddata.append("imagefile", this.imageupload)
            uploaddata.append("title",this.articleInputTitle)
            uploaddata.append("description",this.articleInputDescription)
            this.$server({
                url:  `/article`,
                method: 'POST',
                data:uploaddata,
                headers: {
                    token: token,
                }
            })
            .then(({data}) => {
                console.log(data)
                this.getarticle()
                //this.$emit('to-parent-add-articles', data.articles )
                this.clearArticle()
                $('#addArticleModal').modal('hide');
            })
            .catch((err) => {
                console.log(err)
            });
        }
    }
}
</script>
