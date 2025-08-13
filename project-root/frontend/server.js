const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Для хранения результатов (в памяти, для теста)
const resultsDB = {};

app.use(cors());
app.use(bodyParser.json());

// Получение результата по id
app.get('/api/results/:id', (req, res) => {
  const { id } = req.params;
  if (resultsDB[id]) {
    res.json(resultsDB[id]);
  } else {
    res.status(404).json({ error: 'Result not found' });
  }
});

// Получение всех результатов (для отладки)
app.get('/api/results', (req, res) => {
  res.json(resultsDB);
});

// Сохранение результатов теста
app.post('/api/pattern-test/submit', (req, res) => {
  const data = req.body;
  const id = Date.now().toString(36) + Math.random().toString(36).substr(2, 6); // генерация id
  resultsDB[id] = data;
  res.json({ id });
});

app.listen(PORT, () => {
  console.log(`Test API server running on http://localhost:${PORT}`);
});