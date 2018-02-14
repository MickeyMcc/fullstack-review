const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({  //prop lookups on API query 
  name: String,       // ['name']
  owner_name: String, // ['owner']['login']
  stargazers: Number,// ['stargazers_count']
  url: String,        // ['html_url']
  avatar_url: String  // ['avatar_url']
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  repos.forEach((repo) => {
    repo = new Repo ({
      name: repo['name'],
      owner_name: repo['owner']['login'],
      stargazers: repo['stargazers_count'],
      url: repo['html_url'],
      avatar_url: repo['avatar_url']
    });
    repo.save(function (err) {
      if (err) {
        console.log(err, 'error');
      } else {
        console.log('repo added');
      }
    });
  });
};

module.exports.save = save;