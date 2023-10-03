const requestTime = (req, res, next) => {
  req.requestTime = new Date().toString();
  console.log(req.requestTime);
  next();
};

export default requestTime;
