const { Contacts } = require("../../models");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 7, favorite } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contacts.find(
    { owner, ...(favorite !== undefined && { favorite }) },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "email subscription");
  res.json(result);
};

module.exports = listContacts;
