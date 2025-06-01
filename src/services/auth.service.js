import jwt from "jsonwebtoken";
import { getUserByEmail } from "../models/user.model";

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
  return { accessToken, refreshToken };
}

const signup = async (user) => {
  const user = await getUserByEmail(user.email);
  if (user) {
    throw new Error("User already exists");
  }

  const newUser = await createUser(user);
  const { accessToken, refreshToken } = generateTokens(newUser.id);

  return { user: newUser, tokens: { accessToken, refreshToken } };
}

const login = async (user) => {
  const existingUser = await getUserByEmail(user.email);
  if (!existingUser) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(user.password, existingUser.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const { accessToken, refreshToken } = generateTokens(existingUser.id);
  return { user: existingUser, tokens: { accessToken, refreshToken } };
}

const refreshToken = async (refreshToken) => {
  const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
  const user = await getUserById(decoded.userId);
  if (!user) {
    throw new Error("User not found");
  }

  const { accessToken, refreshToken } = generateTokens(user.id);
  return { user, tokens: { accessToken, refreshToken } };
}

module.exports = {
  signup,
  login,
  refreshToken,
}