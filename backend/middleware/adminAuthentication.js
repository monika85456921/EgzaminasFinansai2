const asyncHandler = require("express-async-handler");
const { getUser, notAuthMessage } = require("./helpers/user.js");

const protectAdmin = asyncHandler(async (req, res, next) => {
  const { status, response } = await getUser(req);

  if (status === 200) {
    if (response.role == "admin") {
      req.user = response;
      next();
    } else {
      res.send(status, response);
    }
  }
});

module.exports = protectAdmin;
