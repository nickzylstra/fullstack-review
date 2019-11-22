const request = require('request');
const config = require('../config.js');

const getReposByUsername = (username, next) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  const options = {
    url: `https://api.github.com/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      Authorization: `token ${config.TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
  };

  return request(options, next);
};

module.exports.getReposByUsername = getReposByUsername;
