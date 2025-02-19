const { Contacts } = require("../../models");

const { HttpError } = require("../../helpers");

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contacts.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "not found");
  }
  res.json(result);
};

module.exports = updateContact;
