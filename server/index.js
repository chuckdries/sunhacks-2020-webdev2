const express = require('express');
const app = express();
const cors = require('cors')

const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')

const dbPromise = sqlite.open({
  filename: './data.db',
  driver: sqlite3.Database
})

const setupDatabase = async() => {
  const db = await dbPromise;
  await db.run('CREATE TABLE IF NOT EXISTS Clicks (id INTEGER PRIMARY KEY);');
}

setupDatabase();

app.use(cors({
  origin: true
}))

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/clicks', async (req, res) => {
  const db = await dbPromise;
  const clicks = await db.get('SELECT COUNT(id) as clicks FROM Clicks;');
  console.log(clicks);
  res.send(clicks);
})

app.post('/click', async (req, res) => {
  const db = await dbPromise;
  await db.run('INSERT INTO Clicks DEFAULT VALUES;');
  const clicks = await db.get('SELECT COUNT(id) as clicks FROM Clicks;');
  res.send(clicks)
})

app.listen(3001, () => {
  console.log("listening on http://localhost:3001")
})
