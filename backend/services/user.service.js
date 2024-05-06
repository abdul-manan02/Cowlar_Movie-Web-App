import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const handleSignUp = async (userData) => {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    const newUser = await User.create({
      name: userData.name,
      email: userData.email,
      username: userData.username,
      password: hashedPassword,
    });
    return newUser;
  } catch (error) {
    throw error;
  }
};

const handleSignIn = async (email, password) => {
  try {
    if (!email || !password) {
      throw new Error("Bad request. Please provide email and password");
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
      expiresIn: "24h",
    });

    return { user, token };
  } catch (error) {
    throw error;
  }
};

export { handleSignUp, handleSignIn };
