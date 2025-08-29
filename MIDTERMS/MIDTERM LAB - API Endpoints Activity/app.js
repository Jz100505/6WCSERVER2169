const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

let users = [
    { id: 1, name: 'johnzelle', email: 'johnzelle@example.com' },
    { id: 2, name: 'jz', email: 'jz@example.com' },
    { id: 3, name: 'manaloto', email: 'manaloto@example.com' }
];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/users', (req, res) => {
    res.json(users);
});

app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required.' });
    }
    const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        name,
        email
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
        users[userIndex].name = name || users[userIndex].name;
        users[userIndex].email = email || users[userIndex].email;
        res.json(users[userIndex]);
    } else {
        res.status(404).json({ message: 'User not found.' });
    }
});

app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const initialLength = users.length;
    users = users.filter(u => u.id !== userId);

    if (users.length < initialLength) {
        res.status(200).json({ message: 'User deleted successfully.' });
    } else {
        res.status(404).json({ message: 'User not found.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});