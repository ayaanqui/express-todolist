exports.home = (req, res, next) => {
  const user = (req.cookies.user) ? req.cookies.user : null;
  const loggedIn = (user) ? true : false;
  return res.render('pages/home/index', { loggedIn: loggedIn, user: user });
};