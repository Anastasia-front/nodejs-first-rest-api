const сontacts = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
  const result = await сontacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await сontacts.getContactById(id);
  if (!result) {
    throw HttpError(404, "not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await сontacts.addContact(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await сontacts.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404, "not found");
  }
  res.json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await сontacts.removeContact(id);
  if (!result) {
    throw HttpError(404, "not found");
  }
  // res.status(204).send()
  res.json({
    message: "contact deleted",
  });
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  removeContact: ctrlWrapper(removeContact),
};
