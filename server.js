const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './build')));

app.get('/api/test', (req, res) => {
  console.log('요청옴');
  res.status(200).json('proxy success!');
});

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});

app.listen(8080, () => {
  console.log('8080 on listening');
});
