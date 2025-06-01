const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, tokens } = await signup(email, password);

    res.cookie(
      "refreshToken",
      tokens.refreshToken,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      }
    );

    return res.status(201).json({ user, accessToken: tokens.accessToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, tokens } = await login(email, password);

    res.cookie(
      "refreshToken",
      tokens.refreshToken,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      }
    );
    
    return res.status(200).json({ user, accessToken: tokens.accessToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    const { user, tokens } = await refreshToken(refreshToken);

    res.cookie(
      "refreshToken",
      tokens.refreshToken,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      }
    );

    return res.status(200).json({ user, accessToken: tokens.accessToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

const logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken");
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  signup,
  login,
  refreshToken,
  logout,
}