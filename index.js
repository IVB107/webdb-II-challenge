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

// ZOOS

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
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json(err);
    })
})

server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
    .where({ id })
    .first()
    .then(zoo => {
      res.status(200).json(zoo);
    })
    .catch(err => {
      res.status(500).json(err);
    })
})

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
    .where({ id })
    .first()
    .del()
    .then(count => {
      count > 0
      ? res.status(204).end()
      : res.status(404).json({ message: "Zoo not found." });
    })
    .catch(err => {
      res.status(500).json(err);
    })
})

server.put('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  const updatedZoo = req.body;

  console.log(updatedZoo)

  return !updatedZoo.name || updatedZoo.name === ''
    ? res.status(400).json({ message: "Please provide a valid 'name' key and value." })
    : db('zoos')
      .where({ id })
      .first()
      .update(updatedZoo)
        .then(count => {
          count > 0
            ? res.status(200).json(count)
            : res.status(404).json({ message: "Zoo not found." });
        })
        .catch(err => {
          res.status(500).json(err);
        })
})

// BEARS

server.post('/api/bears', (req, res) => {
  db('bears')
    .insert(req.body)
    .then(ids => {
      const id = ids[0];
      console.log(ids)
      db('bears')
        .where({ id }) // ES6 => same as: .where({ id: id });
        .first()
        .then(bear => {
          res.status(201).json(bear);
        })
        .catch(err => {
          res.status(500).json({ message: "Couldn't find a bear with that id" });
        })
    })
    .catch(err => {
      res.status(500).json({ message: "Couldn't post bear to database" });
    })
})

server.get('/api/bears', (req, res) => {
  db('bears')
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => {
      res.status(500).json(err);
    })
})

server.get('/api/bears/:id', (req, res) => {
  const { id } = req.params;

  db('bears')
    .where({ id })
    .first()
    .then(bear => {
      res.status(200).json(bear);
    })
    .catch(err => {
      res.status(500).json(err);
    })
})

server.delete('/api/bears/:id', (req, res) => {
  const { id } = req.params;

  db('bears')
    .where({ id })
    .first()
    .del()
    .then(count => {
      count > 0
      ? res.status(204).end()
      : res.status(404).json({ message: "Bear not found." });
    })
    .catch(err => {
      res.status(500).json(err);
    })
})

server.put('/api/bears/:id', (req, res) => {
  const { id } = req.params;
  const updatedbear = req.body;

  console.log(updatedbear)

  return !updatedbear.name || updatedbear.name === ''
    ? res.status(400).json({ message: "Please provide a valid 'name' key and value." })
    : db('bears')
      .where({ id })
      .first()
      .update(updatedbear)
        .then(count => {
          count > 0
            ? res.status(200).json(count)
            : res.status(404).json({ message: "Bear not found." });
        })
        .catch(err => {
          res.status(500).json(err);
        })
})


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

// module.exports = router;