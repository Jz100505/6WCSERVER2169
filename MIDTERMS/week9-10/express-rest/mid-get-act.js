const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json());

let movies = [{
  id: 1,
  title: 'Superman'
}, {
  id: 2,
  title: 'Thor'
}, {
  id: 3,
  title: 'Iron Man'
}];

app.get('/api/movies', (req, res) => {
  res.send(movies);
});

app.get('/api/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) {
    return res.status(404).send('The movie with the given ID was not found.');
  }
  res.send(movie);
});

app.get('/api/heroes', (req, res) => {
  res.send(heroes);
});

app.get('/api/heroes/:id', (req, res) => {
  res.send(req.params.id);
});

app.get('/api/heroes/:title/:publisher', (req, res) => {
  res.send(req.params);
});

app.get('/api/heroes/:title/:publisher', (req, res) => {
  res.send([req.params, req.query]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});