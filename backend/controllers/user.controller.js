import { handleSignUp, handleSignIn } from "../services/user.service.js";

const signUp = async (req, res) => {
  try {
    const newUser = await handleSignUp(req.body);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const signIn = async (req, res) => {
  try {
    const { user, token } = await handleSignIn(req.body.email, req.body.password);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

export { signUp, signIn };