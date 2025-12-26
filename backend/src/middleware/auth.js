const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Mohon masukkan token.",
    });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({
      message: "Format token tidak valid.",
    });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;

    const path = req.baseUrl;

   
    if (decoded.role === "admin") {
      return next();
    }

    if (decoded.role === "operator") {

      if (
        path.startsWith("/api/machines") ||
        path.startsWith("/api/production")
      ) {
        return next();
      }

      return res.status(403).json({
        message: "Operator tidak memiliki akses ke resource ini.",
      });
    }

    return res.status(403).json({
      message: "Akses ditolak.",
    });

  } catch (error) {
    return res.status(401).json({
      message: "Token tidak valid.",
    });
  }
}

module.exports = { authMiddleware };
