const getCurrent = async (req, res) => {
  const { email, subscription, name } = req.user;

  res.json({
    name,
    email,
    subscription,
  });
};

module.exports = getCurrent;
