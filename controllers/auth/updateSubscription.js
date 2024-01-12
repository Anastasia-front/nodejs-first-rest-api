const { User } = require("../../models");

const { HttpError } = require("../../helpers");

const updateSubscription = async (req, res) => {
  const user = req.user;
  const result = await User.findByIdAndUpdate(user, req.body, { new: true });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = updateSubscription;
