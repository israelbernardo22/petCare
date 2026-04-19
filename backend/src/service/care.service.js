const prisma = require('../prisma/client');

async function createCare(data) {
  return prisma.careRecord.create({ data });
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

module.exports = { createCare, getHistory };