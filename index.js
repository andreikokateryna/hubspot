const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', './views');

// Головна
app.get('/', (req, res) => {
  res.render('index', { title: 'HubSpot Integration', message: 'Hello from HubSpot Integration!' });
});

// Список кастомних обʼєктів
app.get('/custom-objects', async (req, res) => {
  try {
    const url = `https://api.hubapi.com/crm/v3/objects/${process.env.CUSTOM_OBJECT}`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${process.env.HUBSPOT_TOKEN}` }
    });
    res.render('custom-objects', { objects: response.data.results });
  } catch (error) {
    res.status(500).send('Error fetching custom objects');
  }
});

// Деталі обʼєкта
app.get('/custom-objects/:id', async (req, res) => {
  try {
    const url = `https://api.hubapi.com/crm/v3/objects/${process.env.CUSTOM_OBJECT}/${req.params.id}`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${process.env.HUBSPOT_TOKEN}` }
    });
    res.render('custom-object', { object: response.data });
  } catch (error) {
    res.status(500).send('Error fetching object');
  }
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT
