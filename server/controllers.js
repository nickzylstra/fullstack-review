/* eslint-disable no-console */
const db = require('../database/index');
const { getReposByUsername } = require('../helpers/github');

module.exports = {
  addUser: (username, next) => {
    getReposByUsername(username, (err, { body }) => {
      if (err) {
        console.log(err);
        next(err);
      } else {
        const repos = JSON.parse(body);
        db.save(repos, (error, updatedCount) => {
          if (error) {
            console.log(error);
            next(err);
          }
          next(null, updatedCount);
        });
      }
    });
  },
  getTop25: (username, next) => {
    db.getTop25(username, (err, repos) => {
      if (err) {
        console.log(err);
        next(err);
      } else {
        next(null, repos);
      }
    });
  },
};
