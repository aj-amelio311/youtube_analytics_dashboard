var http = require('http');
const axios = require("axios");
const {MongoClient} = require("mongodb");
const assert = require('assert');

var port = 8080;

const url = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=LscMxpMQ7Kc&key=xxx";
const subCountUrl = "https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCH0d9SP5xoA2xVIeXUp3iyA&key=xxx";

const uri = "mongodb://userxxxname:passxxxword!@cluster0-shard-00-00-a8rw3.mongodb.net:21237017,cluster0-shard-00-01-a8rw3.mongodb.net:21237017,cluster0-shard-00-02-a8rw3.mongodb.net:21237017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";


http.createServer(function (req, res) {
   res.writeHead(200, {'Content-Type': 'text/plain'});
}).listen(port);

setInterval(function() {
  axios.get(url).then((response) => {
    var date = new Date();
    var dateFormatted = date.toString().split(" ").slice(1, 4).join(" ");
    for (item in response.data.items) {
      var viewCount = response.data.items[item].statistics.viewCount;
      var likeCount = response.data.items[item].statistics.likeCount;
      var dislikeCount = response.data.items[item].statistics.dislikeCount;
      var commentCount = response.data.items[item].statistics.commentCount;
      axios.get(subCountUrl).then((response) => {
        for (item in response.data.items) {
          var subCount = response.data.items[item].statistics.subscriberCount;
        }
              var data = {
                  "views": viewCount,
                  "likes": likeCount,
                  "dislikes": dislikeCount,
                  "comments": commentCount,
                  "subscribers": subCount,
                  "date": dateFormatted
                }


MongoClient.connect(uri, function(err, client) {
  assert.equal(null, err);
  const db = client.db("yt-stats");
   db.collection('data-aws').insertOne(data, (err, result) => {
      if (err) {
        console.log(err)
      }
    })
        client.close();
  });

      }).catch((error) => {
        console.log(error)
      });
    }
  }).catch((error) => {
    console.log(error)
  })
}, 86400000)


console.log('Listening on port', port);
