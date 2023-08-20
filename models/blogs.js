
const mongoose = require('mongoose')

const blogsSchema = mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    content:{
        type:{},
        require:true
    },
    author:{
        type:String,
        default:"Admin"
    },
    slug:{
        type:String,
        lowercase:true,
        unique:true
    }

},{timestamps:true})


module.exports = mongoose.model("Blogs",blogsSchema)