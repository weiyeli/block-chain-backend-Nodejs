const logger = (req, res, next) => {
  console.log(`${req.protocal}://${req.get("host")}${req.orignalUrl}`);
  next();
};

module.exports = logger;
