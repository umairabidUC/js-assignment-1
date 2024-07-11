const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'umair',
  password: 'umair',
  database: 'JavaScript'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});

app.post('/add-topic', (req, res) => {
  const { Topics, duration, link } = req.body;
  const sql = 'INSERT INTO Topics (Topics, Duration, Link) VALUES (?, ?, ?)';
  db.query(sql, [Topics, duration, link], (err, result) => {
    if (err) throw err;
    res.send('Topic added...');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});