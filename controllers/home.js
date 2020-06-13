exports.home = (req, res, next) => {
  const loggedIn = (req.user) ? true : false;
  return res.render('pages/home/index', { loggedIn: loggedIn });
};
};