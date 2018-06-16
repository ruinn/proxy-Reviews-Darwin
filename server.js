const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});

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
    .get(`http:/localhost:3004/api/reviews/overview/${id}`)
    .then(response => res.send(response.data))
    .catch(err => {
      console.log('Error:', err);
      res.json({ message: 'Cannot GET /api/reviews/overview/id' });
    });
});
