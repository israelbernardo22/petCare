const prisma = require("../prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(email, password) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("E-mail ou senha inválidos.");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("E-mail ou senha inválidos.");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    return { token, user: { id: user.id, email: user.email, name: user.name } };
  } catch (error) {
    console.error("ERRO REAL NO LOGIN:", error.message);
    throw error;
  }
}

async function register(userData) {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });

    return user;
  } catch (error) {
    if (error.code === "P2002") {
      throw new Error("Este e-mail já está cadastrado.");
    }
    throw error;
  }
}

async function getUserById(id) {
  return prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, phone: true, avatarUrl: true },
  });
}

async function updateUser(id, data) {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  return prisma.user.update({
    where: { id },
    data,
    select: { id: true, name: true, email: true, phone: true, avatarUrl: true },
  });
}

module.exports = { login, register, getUserById, updateUser };
