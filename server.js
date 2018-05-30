const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const db = require('./data/db.js');

const server = express();

//middleware
server.use(morgan('dev'));
server.use(helmet());
server.use(express.json());
        //get is requesting the information
        
        //homies
// server.get('/', (req, res) => {
// // 1st arg: route where a resource can be interacted with
//   // 2nd arg: callback to deal with sending responses, and handling incoming data.
//     res.send('Hello from express');
// });
//post is the method //post is to create

// 

// (1) | GET | /api/users | Returns an array of all the user objects contained in the database.
server.get('/api/users', (req, res) => {
    //get yhe users
    db
        .find()
        .then(users => {
            res.json( users );
        })
        .catch(error => {
            res.status(500).json(error);
            //do something with error
        });
});
        
// (2) | GET | /api/users /: id | Returns the user object with the specified id.   
        server.get('/api/users/:id', (req, res) => {
            //grab the id fromurl parameters
            const { id } = req.params;

            db
                .findById(id)
                .then(users => {
                    res.json(users[0]);
                })
                .catch(error => {
                    //do something with error
                    res.status(500).json(error);
                });
});
        
// (3) | POST | /api/users | Creates a user using the information sent inside the`request body`. 
        //removes the user with the specified id and returns
server.post('/api/users', (req, res) => {
    const user = req.body;
        
    db
        .insert(user)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            // something with erro r
            res.status(500).json({
                    error: 'There wa s an error while saving the wuser to the database',
                        
                });
        });
   
});   
// (4) | DELETE | /api/users /: id | Removes the user with the specified id and returns the deleted user.  
server.delete('/api/users/:id', (req, res) => {
    //grab the id fromurl parameters
    const { id } = req.params;
    let user;

    db
        .findById(id)
        .then(response => {
            user = { ...response[0] };
        

            db
                .remove(id)
                .then(response => {
                    res.status(200).json(response);
                })
                .catch(error => {
                    res.status(500).json(user);
                    //do something with error
                
                })
                .catch(error => {
                    res.status(500).json(error);
                });
        });
});
// (5) | PUT | /api/users /: id | Updates the user with the specified`id` using data from the`request body`.Returns the modified document, ** NOT the original **. |
//return the modifiyed document.
server.put('/api/users/:id', (req, res) => {
    //grab the id fromurl parameters
    const { id } = req.params;
    const update = req.body;
    let user;

    db
        .findById(id)
        .then(response => {
            user = { ...response[0] };


            db
                .remove(id)
                .then(response => {
                    res.status(200).json(response);
                })
                .catch(error => {
                    res.status(500).json(user);
                    //do something with error

                })
                .catch(error => {
                    res.status(500).json(error);
                });
        });
});

// pull id off of req.params;
  // invoke proper db.method(id) passing it the id.
  // handle the promise like above
  const port = 5000;
server.listen(port, () => console.log('Server running on port '));
