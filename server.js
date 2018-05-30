const express = require('express');
const cors = require('cors');
const chalk = require('chalk');
const db = require('./data/db');

const server = express();
const port = 5555;
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['POST', 'GET', 'PUT', 'DELETE']
};

const customLogger = (req, res, next) => {
  const timestamp = new Date(Date.now());
  console.log(`\n${chalk.green(`@${timestamp.toISOString(
  )}:`)} Request made from ${req.headers.origin || req.headers['user-agent']} to ${req.headers.host}\n
    ${chalk.bold('Method:')}  ${req.method}
    ${chalk.bold('Path:')}    ${req['_parsedUrl'].path}
  `);
  console.groupEnd();
  next();
};

server.use(express.json());
server.use(cors(corsOptions));
server.use(customLogger);

server.post('/api/users', (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    res.status(400).json({ error: 'Please provide name and bio for the user.' });
    return;
  }

  db
    .insert({ name, bio })
    .then(userId => {
      db
        .findById(userId.id)
        .then(user => {
          res.status(201).json(user);
        })
        .catch(error => {
          res.status(500).json({ error });
        });
    })
    .catch(error => {
      res.status(500).json({ error: 'There was an error while saving the user to the database.' });
    });
});

server.get('/api/users', (req, res) => {
  db
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ error: 'The users information could not be retrieved.' });
    });
});

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;

  db
    .findById(id)
    .then(user => {
      if (user.length > 0) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'The user information could not be retrieved.' });
    });
});

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;

  if (!name || !bio) {
    res.status(400).json({ error: 'Please provide name and bio for the user.' });
    return;
  }

  db
    .update(id, { name, bio })
    .then(records => {
      if (records > 0) {
        db
          .findById(id)
          .then(user => {
            res.status(200).json(user);
          })
          .catch(error => {
            res.status(500).json(error);
          });
      } else {
        res.status(404).json({ error: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'The user information could not be modified.' });
    });
});

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;

  db
    .findById(id)
    .then(user => {
      if (user.length > 0) {
        db
          .remove(id)
          .then(records => {
            if (records > 0) {
              res.status(200).json(user[0]);
            } else {
              res.status(500).json({ error: 'The user could not be removed.' });
            }
          })
          .catch(error => {
            res.status(500).json({ error: 'The user could not be removed.' })
          });
      } else {
        res.status(404).json({ error: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'The user could not be removed.' })
    });
});

server.listen(port, () => console.log(`Server running on port ${port}`));