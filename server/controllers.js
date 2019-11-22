/* eslint-disable no-console */
const db = require('../database/index');
const { getReposByUsername } = require('../helpers/github');

module.exports = {
  addUser: (username, next) => {
    getReposByUsername(username, (err, { body }) => {
      if (err) {
        console.log(err);
        next();
      }
      const repos = JSON.parse(body);
      db.save(repos, (error, data) => {
        if (error) {
          console.log(error);
        }
        // TODO update below
        next(data);
      });
    });
  },
};
