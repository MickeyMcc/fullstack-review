const express = require('express');
var bodyParser = require('body-parser')
const helpers = require('../helpers/github');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log(req.body);
  helpers.getReposByUsername('hello');


  res.end(JSON.stringify({message: 'nice work'}));
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

