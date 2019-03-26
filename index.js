const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const server = express();

server.use(express.json());
server.use(helmet());

const knexConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './data/lambda.sqlite3'
  }
}

const db = knex(knexConfig);

// endpoints here

server.post('/api/zoos', (req, res) => {
  db('zoos')
    .insert(req.body)
    .then(ids => {
      const id = ids[0];
      console.log(ids)
      db('zoos')
        .where({ id }) // ES6 => same as: .where({ id: id });
        .first()
        .then(zoo => {
          res.status(201).json(zoo);
        })
        .catch(err => {
          res.status(500).json({ message: "Couldn't find a zoo with that id" });
        })
    })
    .catch(err => {
      res.status(500).json({ message: "Couldn't post zoo to database" });
    })
})

server.get('/api/zoos', (req, res) => {
  // Do Stuff
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json(err);
    })
})

server.get('/api/zoos/:id', (req, res) => {
  // Do Stuff
})

server.delete('/api/zoos/:id', (req, res) => {
  // Do Stuff
})

server.put('/api/zoos/:id', (req, res) => {
  // Do Stuff
})


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

// module.exports = router;