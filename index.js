// implement your API here

const express = require('express');
const server = express();

const Users = require('./data/db');

server.use(express.json());

server.get('/', (request, response) => {
  response.send('Hello from our new server!!!');
});

//POST

server.post('/api/users', (request, response) => {
  const newUser = request.body;
  if (!newUser.name && !newUser.bio) {
    response.status(400).json({
      success: false,
      error: 'Please providfe name and bio for the user'
    });
  } else {
    Users.insert(newUser)
      .then(user => {
        response.status(201).json({ success: true, user });
      })
      .catch(err => {
        response.status(500).json({
          success: false,
          error: 'There was an error while saving the user to the database'
        });
      });
  }
});

//GET
server.get('/api/users', (request, response) => {});

//DELETE

//PUT

server.listen(4000, () => {
  console.log('Server listening on port 4000.');
});
