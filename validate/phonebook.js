const Joi = require('@hapi/joi');
const { bangladeshiNumberRegExp }=require('../common/helpers');
const createPhonebookValidate = Joi.object({
    name: Joi.string().required(),
    phoneNo: Joi.string().pattern(new RegExp(bangladeshiNumberRegExp)).required(),
});
const editPhonebookValidate = Joi.alternatives().try(
    Joi.object().keys({
        name: Joi.string().required(),
        phoneNo: Joi.string().pattern(new RegExp(bangladeshiNumberRegExp))
      }),
    Joi.object().keys({
        name: Joi.string(),
        phoneNo: Joi.string().pattern(new RegExp(bangladeshiNumberRegExp)).required()
      })
  );
module.exports.createPhonebookValidate = createPhonebookValidate;
module.exports.editPhonebookValidate = editPhonebookValidate;