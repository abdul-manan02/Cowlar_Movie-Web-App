import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createUserTable = async (req, res) => {
  try {
    await User.sync({ force: false });
    res.status(200).json({ msg: "User table created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const dropUserTable = async (req, res) => {
  try {
    await User.drop();
    res.status(200).json({ msg: "User table dropped successfully" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const signUp = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    });

    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Bad request. Please provide email and password" });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
      expiresIn: "24h",
    });

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

export { createUserTable, dropUserTable, signUp, signIn };
