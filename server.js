const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
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
  console.log('Received data:', req.body);
  const { Topics, Duration, Link, update } = req.body;
  console.log(update)
  if(update){
    const sql = `
    UPDATE Topics
    SET Duration = ?, Link = ?
    WHERE Topics.Topics = ?;
  `;
  
  // Execute the query
  db.query(sql, [Topics, Duration, Link, Topics], (err, result) => {
    if (err) {
      console.error('Database update error:', err);
      return;
    }
    console.log('Topic updated:', result);
  });

  } else{
    
    const sql = 'INSERT INTO Topics (Topics, Duration, Link) VALUES (?, ?, ?)';
    db.query(sql, [Topics, Duration, Link], (err, result) => {
      if (err) throw err;
      res.send('Topic added...');
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});