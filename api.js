const express = require("express");
const {MongoClient} = require("mongodb");
const assert = require("assert");
var cors = require("cors");

var port = 9000

var app = express();

app.use(cors({origin: '*'}));

const dbUrl = "mongodb://userxxxname:passxxxword!@cluster0-shard-00-00-a8rw3.mongodb.net:21237017,cluster0-shard-00-01-a8rw3.mongodb.net:21237017,cluster0-shard-00-02-a8rw3.mongodb.net:21237017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
console.log("booted up on port " + port)

app.get("/all", (request, response, next) => {
  MongoClient.connect(dbUrl, (err, client) => {
    assert.equal(null, err);
    const db = client.db("yt-stats");
    db.collection("data-aws").find().toArray().then((docs) => {
        response.send(docs)
      }, (err) => {
        console.log(error)
      })
      client.close();
  })
})

app.get("/previous_day", (request, response) => {
  MongoClient.connect(dbUrl, (err, client) => {
    assert.equal(null, err);
    const db = client.db("yt-stats");
    db.collection("data-aws").find().sort({ $natural: -1 }).limit(2).toArray().then((docs) => {
      var yesterdayViews = docs[0].views;
      var todayViews = docs[1].views;
      var yesterdaySubscribers = docs[0].subscribers;
      var todaySubscribers = docs[1].subscribers;
      var yesterdayComments = docs[0].comments;
      var todayComments = docs[1].comments;
      var yesterdayLikes = docs[0].likes;
      var todayLikes= docs[1].likes;
      var yesterdayDislikes = docs[0].dislikes;
      var todayDislikes= docs[1].dislikes;
        response.send({
          "views": yesterdayViews - todayViews,
          "subscribers": yesterdaySubscribers - todaySubscribers,
          "comments": yesterdayComments - todayComments,
          "likes": yesterdayLikes - todayLikes,
          "dislikes": yesterdayDislikes - todayDislikes
        })
      }, (err) => {
        console.log(error)
      })
      client.close();
  })
})

app.get("/all_time", (request, response) => {
  MongoClient.connect(dbUrl, (err, client) => {
    assert.equal(null, err);
    const db = client.db("yt-stats");
    db.collection("data-aws").find().sort({ $natural: -1 }).limit(1).toArray().then((docs) => {
        response.send(docs)
      }, (err) => {
        console.log(error)
      })
      client.close();
  })
})

app.get("/month/:month/:year", (request, response) => {
  MongoClient.connect(dbUrl, (err, client) => {
    assert.equal(null, err);
    const db = client.db("yt-stats");
    db.collection("data-aws").find({"date": {'$regex': request.params.month, '$options': 'i'}}).toArray().then((docs) => {
        const findYear = docs.filter((resp) => {
          return resp.date.slice(-4) == request.params.year
        })
        response.send(findYear)
      }, (err) => {
        console.log(error)
      })
      client.close();
  })
})

app.get("/year/:year", (request, response) => {
  MongoClient.connect(dbUrl, (err, client) => {
    assert.equal(null, err);
    const db = client.db("yt-stats");
    db.collection("data-aws").find({"date": {'$regex': request.params.year, '$options': 'i'}}).toArray().then((docs) => {
        response.send(docs)
      }, (err) => {
        console.log(error)
      })
      client.close();
  })
})

app.get("/like_ratio", (request, response) => {
  MongoClient.connect(dbUrl, (err, client) => {
    assert.equal(null, err);
    const db = client.db("yt-stats");
    db.collection("data-aws").find().sort({ $natural: -1 }).limit(1).toArray().then((docs) => {
      var likes = parseInt(docs[0].likes);
      var dislikes = parseInt(docs[0].dislikes);
        response.send(
          {
            "likes": likes,
            "dislikes": dislikes,
            "ratio": ((likes / (likes + dislikes)) * 100).toFixed(1) + "%",
            "rawRatio": ((likes / (likes + dislikes)) * 100).toFixed(1)
          }
        )
      }, (err) => {
        console.log(error)
      })
      client.close();
  })
})


app.listen(port)
