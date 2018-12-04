
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const articleSchema = mongoose.Schema({
    title: String,
    description: String,
    imageurl:String,
    author: {
        type: schema.Types.ObjectId,
        ref: 'User'
    },
    display : Boolean
}, {
    timestamps: true
})

let Article = mongoose.model('Article', articleSchema)

module.exports = Article