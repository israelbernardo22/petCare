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


async function getById(req, res) {
  try {
    const care = await service.getCareById(req.params.id, req.params.petId);
    res.json(care);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

async function update(req, res) {
  try {
    const care = await service.updateCare( req.params.id, req.body);
    res.json(care);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

async function remove(req, res) {
  try {
    await service.deleteRecord(req.params.id);
    res.status(204).send();
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}

module.exports = { create, history, getById, update, remove };