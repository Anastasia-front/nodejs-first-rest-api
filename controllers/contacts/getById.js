const { Contacts } = require("../../models");

const { HttpError } = require("../../helpers");

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contacts.findById(id);
  if (!result) {
    throw HttpError(404, "not found");
  }
  res.json(result);
};

module.exports = getContactById;
