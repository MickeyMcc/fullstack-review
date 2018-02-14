const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/fetcher');

console.log(process.env);
mongoose.connect(process.env.DATABASE_URI || require('../config.js').DATABASE_URI);
let repoSchema = mongoose.Schema({  //prop lookups on API query 
  name: String,       // ['name']
  owner_name: String, // ['owner']['login']
  stargazers: Number,// ['stargazers_count']
  url: String,        // ['html_url']
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (username, repos) => {
  
  //only adds repos to database if user isn't already in there
  //would probably be better to do that pre-github call for speed
  let checkQuery = Repo.findOne({owner_name: username});
  checkQuery.exec((err, results) => {
    if (err) {
      console.log(err)
    } else if (results === null) {
      repos.forEach((repo) => {
        repo = new Repo ({
          name: repo['name'],
          owner_name: repo['owner']['login'],
          stargazers: repo['stargazers_count'],
          url: repo['html_url'],
        });
        repo.save(function (err) {
          if (err) {
            console.log(err, 'error');
          } 
        });
      });
    } else {
      console.log('user already in database!');
    }
  })
};

let query = (callback) => {
  let search = Repo.find().limit(25).sort({'stargazers': -1});

  search.exec(function(err, results) {
    if (err) {
      callback(err);
    } else {
      console.log(results);
      callback(null, results);
    }
  })
}

module.exports.query = query;
module.exports.save = save;