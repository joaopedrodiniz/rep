const express = require('express');
const app = express();
const routes = require('./routes/route.js');
const bodyParser = require('body-parser');
const cors = require('cors');

// Configuração do CORS
app.use(cors({
    origin: ['http://127.0.0.1:5500', 'https://trabalhomunchikingame.vercel.app/'], // Adicione a URL do front-end em produção
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

// Configuração do Body Parser
app.use(bodyParser.json());

// Rotas da API
app.use('/api', routes);

const port = process.env.PORT || 3000;

// Inicialização do servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
