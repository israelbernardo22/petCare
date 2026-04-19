const prisma = require('../prisma/client');

async function createPet(data) {
  return prisma.pet.create({ data });
}

async function listPetsByUser(userId) {
  return prisma.pet.findMany({
    where: { userId }
  });
}
async function getPetById(id) {
  return prisma.pet.findUnique({ where: { id } });
}

async function updatePet(id, data) {
  return prisma.pet.update({ where: { id }, data });
}

module.exports = { createPet, listPetsByUser, getPetById, updatePet };