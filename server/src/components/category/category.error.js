const {
  UNPROCESSABLE_ENTITY,
  UNAUTHORIZED,
  NOT_FOUND,
} = require("http-status-codes");
const { AppError } = require("../../library/helpers/errorFormatHelpers");

module.exports = {
  InvalidInput: (
    content = {},
    message = "Invalid form inputs",
    name = null,
    innerException = null
  ) =>
    new AppError(name, UNPROCESSABLE_ENTITY, message, content, innerException),
  CategoryExist: (
    content = {},
    message = "You have already created product with this name so you cannot create another one",
    name = null,
    innerException = null
  ) =>
    new AppError(name, UNPROCESSABLE_ENTITY, message, content, innerException),
  CategoryNotFound: (
    content = {},
    message = "category not found.",
    name = null,
    innerException = null
  ) => new AppError(name, NOT_FOUND, message, content, innerException),

  NotAllowed: (
    content = {},
    message = "You are not allowed to perform this task",
    name = null,
    innerException = null
  ) =>
    new AppError(name, UNPROCESSABLE_ENTITY, message, content, innerException),
  Inactive: (
    content = {},
    message = "Sorry this Owner is inactive",
    name = null,
    innerException = null
  ) =>
    new AppError(name, UNPROCESSABLE_ENTITY, message, content, innerException),
};
