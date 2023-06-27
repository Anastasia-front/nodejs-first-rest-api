const { Contacts } = require("../../models/contacts");

const { HttpError } = require("../../helpers");

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contacts.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "not found");
  }
  res.json({
    message: "contact deleted",
  });
};

module.exports = removeContact;
