const service = require("../service/user.service");

async function login(req, res) {
  try {
    console.log("BODY RECEBIDO:", JSON.stringify(req.body));
    const result = await service.login(req.body.email, req.body.password);
    res.json(result);
  } catch (e) {
    console.error("ERRO NO CONTROLLER:", e.message);
    res.status(400).json({ error: e.message });
  }
}

async function register(req, res) {
  try {
    const result = await service.register(req.body);
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

async function getProfile(req, res) {
  try {
    const user = await service.getUserById(req.params.id);
    res.json(user);
  } catch (e) {
    console.error("ERRO NO CONTROLLER:", e.message);
    res.status(400).json({ error: e.message });
  }
}

async function updateProfile(req, res) {
  try {
    const user = await service.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

module.exports = { login, register, getProfile, updateProfile };
