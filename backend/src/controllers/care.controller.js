const service = require('../service/care.service');

async function create(req, res) {
  const care = await service.createCare(req.body);
  res.json(care);
}

async function history(req, res) {
  const data = await service.getHistory(
    req.params.petId,
    req.query
  );
  res.json(data);
}

module.exports = { create, history };