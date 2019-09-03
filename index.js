// implement your API here: 

const express = require('express');//Importing express from express package

const Users = require('./data/db');
//Users has  find(), findById(), insert(), remove(), update() methods

const server = express('');//instance of a server powered by express

server.use(express.json());

//test
server.get('/', (req, res) => {
  res.send('Hello World');
});


//CHALLENGE: Create endpoints that gets/adds/deletes/updates the list of users stored in a database

// Find user
server.get('/api/users', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(500).json({
        errorMessage: 'The users information could not be retrieved'
      });
    });
});

//find user by id
server.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;

  Users.findById(userId)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(400).json( { message: "The user with the specified ID does not exist." } )
      }
    })
    .catch(() => {
      res.status(500).json({
        errorMessage: 'The users information could not be retrieved'
      });
    });
});


//add/insert a user to database
server.post('/api/users', (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' })
  } else {

    Users.insert(req.body)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
      })
  }

})

//delete a user by id = /user/4
server.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;

  Users.remove(userId)
    .then(hobbit => {
      res.status(200).json({ message: 'hobbit deletion successful' });
    })
    .catch(err => {
      res.status(500).json({ message: 'error removing hobbit' })
    })
})


const port = 5000;
server.listen(port, () => console.log(`API running on port ${port}`));
