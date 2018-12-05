var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newsSchema = new Schema({
  newsTitle:{
    type:String,
    unique:true
  },
  author:{
    type:String
  },
  date:{
    type:String
  },
  commentNum:{
    type:Number
  },
  likeNum:{
    type:Number
  },
  shareNum:{
    type:Number
  },
  content:{
    type:String
  },
  contentImg:{
    type:[String]
  }
})
module.exports = mongoose.model('news',newsSchema);
