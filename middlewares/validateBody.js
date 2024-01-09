const { HttpError } = require("../helpers");

const checkRequiredFields = (name, email, phone, favorite) => {
  const missingFields = [];
  const nonStringFields = [];
  const nonBooleanField = [];

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

  if (!favorite) {
    missingFields.push("favorite");
  } else if (typeof favorite !== "boolean") {
    nonBooleanField.push("favorite");
  }

  if (
    missingFields.length === 0 &&
    nonStringFields.length === 0 &&
    nonBooleanField.length === 0
  ) {
    return "all required fields are filled";
  }

  let errorMessage = "";

  if (missingFields.length > 0) {
    errorMessage += `missing required fields - ${missingFields.join(", ")}  /`;
  }

  if (nonStringFields.length > 0) {
    errorMessage += `  non-string fields - ${nonStringFields.join(", ")}    /`;
  }

  if (nonBooleanField.length > 0) {
    errorMessage += `  non-boolean field - ${nonBooleanField.join(", ")}`;
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
      const favorite = error._original.favorite;
      const message = checkRequiredFields(name, email, phone, favorite);
      if (error._original) next(HttpError(400, message));
    }
    next();
  };

  return func;
};

const validateFavorite = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      console.log(error);
      next(HttpError(400, "missing field favorite"));
    }
    next();
  };

  return func;
};
const validateSubscription = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      console.log(error);
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

const validateAuth = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error));
    }
    next();
  };

  return func;
};

const validateEmail = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, "missing required field email"));
    }
    next();
  };

  return func;
};

module.exports = {
  validateFavorite,
  validateBody,
  validateAuth,
  validateSubscription,
  validateEmail,
};
