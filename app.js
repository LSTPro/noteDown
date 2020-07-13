require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
mongoose.set('useUnifiedTopology', true);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));



mongoose.connect("mongodb+srv://@cluster0.cceon.mongodb.net/keeperdb?retryWrites=true&w=majority", {
  user: process.env.DB_ADMIN,
  pass: process.env.DB_PASSWORD,
  useNewUrlParser: true,
  useFindAndModify: false
});
const keeperSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  notesCollection: [{
    Id: String,
    title: String,
    content: String
  }]
})

const Keeper = mongoose.model("Unit", keeperSchema);

const unit = new Keeper({
  username: "Likhith",
  password: "abc",
  notesCollection: [{
    title: "Creator",
    content: "Likhith"
  }]
})

/* GET users listing. */
app.get('/users', function(req, res, next) {
  Keeper.find(function(err, results) {
    if (!err) {
      res.json(results.map(user => {
        return user.notesCollection
      }));
    }
  })

});

app.get('*', (req, res) => {
  res.sendFile(__dirname+'/client/public/index.html');
});

app.post("/users", function(req, res) {
  res.json("pip")
  const add = req.body;
  Keeper.findOneAndUpdate({
    username: "Likhith"
  }, {
    $push: {
      notesCollection: add
    }
  }, function(err) {
    if (!err) {
      console.log("Update successful");
    }
  });
})

app.delete("/users", function(req, res) {
  res.json("deleteing...");
  const deleteItemId = req.body.id;
  Keeper.findOneAndUpdate({
    username: "Likhith"
  }, {
    $pull: {
      notesCollection: {
        Id: deleteItemId
      }
    }
  }, function(err) {
    if (!err) {
      console.log("delete successful");
    }
  });
})

app.listen(process.env.PORT || 5000, function() {
  console.log("server at 5000");
})


// mongo "mongodb+srv://cluster0.cceon.mongodb.net/keeperdb" --username admin-Likhith
