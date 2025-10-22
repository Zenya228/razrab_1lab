const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

let users = [];
let idCounter = 1;

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const { FirstName, LastName, Email } = req.body;
  const newUser = { Id: idCounter++, FirstName, LastName, Email };
  users.push(newUser);
  res.json(newUser);
});

app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { FirstName, LastName, Email } = req.body;
  users = users.map(user => user.Id === id ? { Id: id, FirstName, LastName, Email } : user);
  res.json({ success: true });
});

app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(user => user.Id !== id);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
