const express = require('express');
const controllers = require('./controllers');

const app = express();

app.use(express.static(`${__dirname}/../client/dist`));
app.use(express.urlencoded({ extended: true }));

app.post('/repos', (req, res) => {
  const query = req.body.q;
  console.log(`'${query}' was submitted to /repos POST`);
  controllers.addUser(query, (err, updatedCount) => {
    // TODO - your code here!
    res.status(201).end(JSON.stringify(updatedCount));
  });

  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', (req, res) => {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

const port = 1128;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
