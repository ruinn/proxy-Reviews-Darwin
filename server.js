const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/:id', express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});

// OVERVIEW
app.get('/overview/:id', (req, res) => {
  const id = req.params.id;
  axios
    .get(`:3002/api/overview/${id}`)
    .then(response => res.send(response.data))
    .catch(err => res.send(`Cannot get /overview/:id, ${err}`));
});

app.get('/hostels', (req, res) => {
  axios
    .get(':3002/api/hostels')
    .then(response => res.send(response.data))
    .catch(err => res.send(`Cannot get /hostels ${err}`));
});

app.get('/hostels/:id/info', (req, res) => {
  const id = req.params.id;
  axios
    .get(`:3002/api/hostels/${id}/info`)
    .then(response => res.send(response.data))
    .catch(err => res.send(`Cannot get /hostels ${err}`));
});

// REVIEWS
app.get('/reviews/:id/all', (req, res) => {
  const { id } = req.params;
  axios
    // .get(`http:/54.236.158.64/api/reviews/${id}/all`)
    .get(`http:/localhost:3004/api/reviews/${id}/all`)
    .then(response => res.send(response.data))
    .catch(err => {
      console.log('Error:', err);
      res.status(404).json({ message: 'Cannot GET /api/reviews/id/all' });
    });
});

app.get('/reviews/:id/preview', (req, res) => {
  const { id } = req.params;
  axios
    // .get(`http://54.236.158.64/api/reviews/overview/${id}`)
    .get(`:3004/api/reviews/overview/${id}`)
    .then(response => res.send(response.data))
    .catch(err => {
      console.log('Error:', err);
      res.json({ message: 'Cannot GET /api/reviews/overview/id' });
    });
});

//BOOKING
app.get('/api/hostels/:id/reservations', (req, res) => {
  const { id } = req.params;
  axios
    // .get(`http://54.236.158.64/api/reviews/overview/${id}`)
    .get(`:3003/api/hostels/${id}/reservations`)
    .then(response => res.send(response.data))
    .catch(err => {
      console.log('Error:', err);
      res.json({ message: 'Cannot GET /api/reviews/overview/id' });
    });
});

//HEADER
app.get('/api/locations/hostels/:id/info', (req, res) => {
  const { id } = req.params;
  axios
    // .get(`http://54.236.158.64/api/reviews/overview/${id}`)
    .get(`:3006/api/locations/hostels/${id}/info`)
    .then(response => {
      console.log('eric response:', response);
      return res.send(response)})
    .catch(err => {
      console.log('Error:', err);
      res.status(404).json({ Error: err});
    });
});

app.get('/api/locations/:id/info', (req, res) => {
  const { id } = req.params;
  axios
    .get(`:3001/api/locations/${id}/info`)
    .then(response => {
      console.log('eric response:', response);
      return res.send(response)})
    .catch(err => {
      console.log('Error:', err);
      res.json({ message: 'Cannot GET /api/locations/:id/info' });
    });
});

app.get('/locations/hostels', (req, res) => {
  const { id } = req.params;
  axios
    .get(`:3001/locations/hostels`)
    .then(response => {
      console.log('eric response:', response);
      return res.send(response)})
    .catch(err => {
      console.log('Error:', err);
      res.json({ message: 'Cannot GET /locations/hostels' });
    });
});
