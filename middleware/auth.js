const { User } = require("../initDB");

async function auth(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.sendStatus(401);
  }
  const bearerToken = authHeader.split(" ")[1];
  if (!bearerToken) {
    return res.sendStatus(401);
  } else {
    let user;
    try {
      user = await User.findOne({
        attributes: { exclude: [] },
        where: { bearer_token: bearerToken },
      });
    } catch (e) {
      console.log("no such user in db", e);
    }
    if (user) {
      res.locals.isLogged = true;
      res.locals.user = {
        login: user.login,
        name: user.name,
        surname: user.surname,
        middlename: user.middlename,
        manager: user.manager,
        bearerToken,
      };
      return next();
    } else {
      return res.sendStatus(401);
    }
  }
}

module.exports = auth;
