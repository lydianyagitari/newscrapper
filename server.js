// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var Note = require('./models/Note.js');
var Article = require('./models/Article.js');

var request = require('request');
var cheerio = require('cheerio');
mongoose.Promise = Promise;

var PORT = process.env.PORT || 3000;

var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static("public"));
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');

var routes = require("./controllers/controller.js");
app.use("/", routes);
mongoose.connect("mongodb://heroku_ddd2r8dj:r4k1nbgrrhek17hen48gji5jvc@ds335275.mlab.com:35275/heroku_ddd2r8dj", { useNewUrlParser: true } );
 //mongoose.connect("mongodb://localhost/newscrapper", { useNewUrlParser: true });

// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newscrapper"
// mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI);

var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

app.listen(PORT, function() {
  console.log("App running on PORT " + PORT);
});
