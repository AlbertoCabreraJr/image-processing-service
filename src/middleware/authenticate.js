const authenticate = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await getUserById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = {
  authenticate,
}