const service = require('../service/pet.service');

async function create(req, res) {
  try {
    console.log("BODY RECEBIDO:", req.body);
    const pet = await service.createPet(req.body);
    res.status(201).json(pet);
  } catch (e) {
    console.error("ERRO AO CRIAR PET:", e);

    if (e.code === 'P2002') {
      return res.status(409).json({
        message: 'Já existe um pet com esse microchip'
      });
    }

    res.status(500).json({
      message: 'Erro ao criar pet'
    });
  }
}
async function list(req, res) {
  try {
    const pets = await service.listPetsByUser(req.params.userId);
    res.json(pets);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

async function getById(req, res) {
  try {
    const pet = await service.getPetById(req.params.id);
    res.json(pet);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

async function update(req, res) {
  try {
    const pet = await service.updatePet(req.params.id, req.body);
    res.json(pet);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

module.exports = { create, list, getById, update };