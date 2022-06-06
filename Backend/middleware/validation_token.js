const jwt = require("jsonwebtoken");
module.exports.checkToken = async (req, res, next) => {
  let author = req.get("authorization");
  if (author) {
    let token = author.slice(7);
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
      if (error) {
        return res.status(400).send({
          message: "Access is denied",
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      message: "Invalid",
    });
  }
};
