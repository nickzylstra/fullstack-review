/* eslint-disable no-console */
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
  Promise.all(repos.map(
    ({
      id, owner, url, size,
    }) => {
      const curRepo = {
        repoId: id,
        size,
        url,
        ownerLogin: owner.login,
        ownerId: owner.id,
      };
      return Repo.findOneAndUpdate(curRepo, { upsert: true, new: true });
    },
  ))
    .then((updatedRepos) => {
      const updatedCount = updatedRepos.length;
      console.log(`updated or added ${updatedCount} repos to db`);
      next(null, updatedCount);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

const getTop25 = (username, next) => {
  // UPDATE to filter, generalize without username
  Repo.find({ ownerLogin: username })
    .then((repos) => {
      next(null, repos);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

module.exports = {
  save,
  getTop25,
};
