require('dotenv').config();
const bcrypt = require('bcrypt');
const prisma = require('./src/prisma/client');

const email = 'ib94534@gmail.com';
const newPassword = '@123456Teste';

(async () => {
  try {
    const hashed = await bcrypt.hash(newPassword, 10);
    const user = await prisma.user.update({
      where: { email },
      data: { password: hashed },
      select: { id: true, email: true, name: true },
    });
    console.log('Senha redefinida com sucesso para:', user);
  } catch (err) {
    if (err.code === 'P2025') {
      console.error(`Usuario com email ${email} nao encontrado.`);
    } else {
      console.error('Erro ao redefinir senha:', err.message);
    }
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
})();
