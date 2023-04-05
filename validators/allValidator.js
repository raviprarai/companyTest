const Joi = require("joi");
const userDetails=Joi.object().keys({
    firstName:Joi.string().regex(/^[a-zA-Z]{3,30}$/).required(),
    lastName:Joi.string().regex(/^[a-zA-Z]{3,30}$/).required(),
    email:Joi.string().email().required(),
    country:Joi.string().regex(/^[a-zA-Z]{2,30}$/).required(),
    state:Joi.string().regex(/^[a-zA-Z]{2,30}$/).required(),
    city:Joi.string().regex(/^[a-zA-Z]{2,30}$/).required(),
    gender:Joi.string().required(),
    date_of_birth:Joi.date().min('01-01-2009').max('now').iso().required(),
    age:Joi.number()
  })
  module.exports = {
    userDetails
  }
