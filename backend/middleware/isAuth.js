async function isAuth(req, res, next) {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "user doesn't have token" });
    }

    let verifyToken = jwt.verify(token, process.env.JWT_SECRET); //Reads the Header,Reads the Payload.Uses the same Secret Key. Recalculates the signature using:

    if (!verifyToken) {
      return res
        .status(400)
        .json({ success: false, message: "user doesn't have valid token" });
    }

    res.userId = verifyToken.userId;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
}

module.exports = isAuth;
