const { Contacts } = require("../../models");

const { HttpError } = require("../../helpers");

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contacts.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json({
    message: "Contact Deleted",
  });
};

module.exports = removeContact;
