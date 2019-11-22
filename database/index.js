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
  Promise.all(repos.map(({ id, owner, url, size }) => {
    const curRepo = new Repo({
      repoId: id,
      size,
      url,
      ownerLogin: owner.login,
      ownerId: owner.id,
    });

    return curRepo.save();
  }))
    .then((data) => {
      debugger;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.save = save;
