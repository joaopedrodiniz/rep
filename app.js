const express = require('express');
const app = express();
const routes = require('./routes/route.js');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors({
    origin: 'http://127.0.0.1:5500', // Ajuste para a URL do seu frontend
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));


app.use(bodyParser.json());
app.use('/api', routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
