const { HttpError } = require("../helpers");

const checkRequiredFields = (name, email, phone) => {
  const missingFields = [];
  const nonStringFields = [];

  if (!name) {
    missingFields.push("name");
  } else if (typeof name !== "string") {
    nonStringFields.push("name");
  }

  if (!email) {
    missingFields.push("email");
  } else if (typeof email !== "string") {
    nonStringFields.push("email");
  }

  if (!phone) {
    missingFields.push("phone");
  } else if (typeof phone !== "string") {
    nonStringFields.push("phone");
  }

  if (missingFields.length === 0 && nonStringFields.length === 0) {
    return "all required fields are filled";
  }

  let errorMessage = "";

  if (missingFields.length > 0) {
    errorMessage += `missing required fields - ${missingFields.join(", ")}  /`;
  }

  if (nonStringFields.length > 0) {
    errorMessage += `  non-string fields - ${nonStringFields.join(", ")}`;
  }

  return errorMessage;
};

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      console.log(error);
      const name = error._original.name;
      const email = error._original.email;
      const phone = error._original.phone;
      const message = checkRequiredFields(name, email, phone);
      if (error._original) next(HttpError(400, message));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
