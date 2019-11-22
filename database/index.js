const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fetcher');

const repoSchema = mongoose.Schema({
  repoId: Number,
  size: Number,
  url: String,
  ownerLogin: String,
  ownerId: Number,
});

const Repo = mongoose.model('Repo', repoSchema);

const save = (repos, next) => {
  debugger;
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  repos.forEach(({ id, owner, url, size }) => {
    const curRepo = new Repo({
      repoId: id,
      size,
      url,
      ownerLogin: owner.login,
      ownerId: owner.id,
    });
  });
};

module.exports.save = save;
