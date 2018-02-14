const express = require('express');
const bodyParser = require('body-parser')
const helpers = require('../helpers/github');
const dbMethods = require('../database/index');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  helpers.getReposByUsername(req.body.query, function(err, body) {
    if (err) {
      console.log(err);
    } else {
      repos = JSON.parse(body);
      const numRepos = repos.length;
      dbMethods.save(repos);
      //console.log('RESPONSEEEEEEE', res, 'END OF RESSSSSSPONSSSEEE');
      //save(res);
      res.end(JSON.stringify({ message: `${numRepos} found on github for ${req.body.query}`}));
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

