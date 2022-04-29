const { check } = require("express-validator");
const { passwordPattern } = require("../../library/helpers/validationHelpers");

const message = {
  name: "Name field cannot empty",

};

exports.validateSignUp = () => {
  return [
    check("name").isEmpty().withMessage(message.name),
   
  ];
};

