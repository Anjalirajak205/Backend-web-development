let mongoose = require('mongoose')
let uploadSchema= mongoose.Schema({
   imgUrl:{
    type:String,
    //require:true
   }
   ,
   likeCount:{
    type:Number,
    default:0
   }
})

let Upload = mongoose.model('Upload',uploadSchema)
module.exports=Upload