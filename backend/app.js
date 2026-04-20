const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json()); 
app.use('/users', require('./src/routers/user.routes'));
app.use('/pets', require('./src/routers/pet.routes'));
app.use('/care', require('./src/routers/care.routes'));
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando com sucesso na porta ${PORT}`);
  console.log(`🚀 Pronto para receber requisições do Angular!`);
});