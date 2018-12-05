var express = require('express');
var router = express.Router();
var News = require('../models/news');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//获取新闻列表
router.get('/newslist',function(req,res,next){
  var newsList = News.find({},function(err,data){
    if(err) throw err;
    res.send({
      code:1,
      msg:data
    });
  })
});

//增加新闻
router.post('/insert',function(req,res,next){
  var randomRangeNumber = function(minNumber,maxNumber){
    var range = maxNumber - minNumber;// 取值范围的差
    var random = Math.random();//小于1的随机数
    return minNumber + Math.round(random*range);
  }

  var contentImages = [];
  for(var i=0;i<3;i++){
    var rangeNum = randomRangeNumber(0,1084);
    let imageUrl = 'https://picsum.photos/1080/1920/?image='+rangeNum;
    contentImages.push(imageUrl);
  }

  var postData = {
    author:req.body.author,
    date:Date.now(),
    newsTitle:req.body.newsTitle,
    commentNum:req.body.commentNum,
    likeNum:req.body.likeNum,
    shareNum:req.body.shareNum,
    content:req.body.content,
    contentImg:contentImages,
  }
  console.log(postData);
  News.create(postData,function(err,data){
    if(err){
      res.send({
        code:0,
        error:err
      });
    }
    else {
      res.send({
        code:1,
        msg:data._id
      });
    }
  })
});

//删除新闻
router.delete('/del',function(req,res,next){
    var id = req.body._id;
    News.remove({_id:id},function(err,data){
      if(err){
        res.send({
          code:0,
          error:err
        });
      }
      else {
        res.send({
          code:0,
          error:data
        });
      }
    })
});

//更新新闻列表
router.post('/update',function(req,res,next){
  News.update({_id:req.body._id},{newsTitle:'更新数据'},function(err,data){
    if(err){
      res.send({
        code:0,
        error:err
      });
    }
    else {
      res.send({
        code:0,
        error:data
      });
    }
  })
});
module.exports = router;
