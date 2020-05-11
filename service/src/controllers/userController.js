exports.user_isadmin = function (req, res) {
  if (req.user.role === 'admin') {
    res.status(200).json({
      message: { msgBody: 'You are an admin', msgError: false },
    });
  } else {
    res.status(403).json({
      message: { msgBody: "You're not an admin" },
      msgError: true,
    });
  }
};

exports.user_isauthenticated = function (req, res) {
  const { username, role } = req.user;
  res
    .status(200)
    .json({ isAuthenticated: true, user: { username, role } });
};
