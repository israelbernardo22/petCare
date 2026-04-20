const prisma = require('../prisma/client');

async function createCare(data) {
  return prisma.careRecord.create({ data });
}

async function getCareById(id, petid) {
  return prisma.careRecord.findUnique({ where: {petId: petid, id: id } });
}

async function updateCare(id, data) {
  return prisma.careRecord.update({ where: { id }, data });
}

async function getHistory(petId, filters) {
  return prisma.careRecord.findMany({
    where: {
      petId,
      type: filters.type,
      performedAt: {
        gte: filters.startDate ? new Date(filters.startDate) : undefined,
        lte: filters.endDate ? new Date(filters.endDate) : undefined
      }
    },
    orderBy: {
      performedAt: 'desc'
    }
  });
}

async function deleteRecord(id) {
  return prisma.careRecord.delete({
    where: { id }
  });
}

module.exports = { createCare, getHistory, getCareById, updateCare, deleteRecord };