const express = require('express');
const bodyParser = require('body-parser')
const helpers = require('../helpers/github');
const dbMethods = require('../database/index');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.json());

app.post('/repos', function (req, res) {

  helpers.getReposByUsername(req.body.query, function(err, body) {
    if (err) {
      console.log(err);
      res.status(500).end(err);
    } else {
      repos = JSON.parse(body);
      dbMethods.save(repos);
      res.status(201).end(JSON.stringify({ message: `${repos.length} found on github for ${req.body.query}`}));
    }
  });


});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

