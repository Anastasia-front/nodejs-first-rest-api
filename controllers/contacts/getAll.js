const { Contacts } = require("../../models/contacts");

const listContacts = async (req, res) => {
  const result = await Contacts.find({}, "-createdAt -updatedAt");
  res.json(result);
};

module.exports = listContacts;
