const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { constants } = require("../libs");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: constants.LIMIT_LENGTH_PASSWORD.minLength,
      // maxlength: constants.LIMIT_LENGTH_PASSWORD.maxLength,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      minlength: constants.LIMIT_LENGTH_EMAIL.min,
      maxlength: constants.LIMIT_LENGTH_EMAIL.max,
      unique: true,
    },
    token: {
      type: String,
      default: null,
    },
    userBalance: {
      type: Number,
      default: 0,
    },
    userName: {
      type: String,
      minlength: constants.LIMIT_LENGTH_NAME.minLength,
      maxlength: constants.LIMIT_LENGTH_NAME.maxLength,
      required: [true, "Name is required"],
    },
    repeat_password: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchemaLogIn = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: constants.MIN_DOMAIN_SEGMENTS,
      tlds: { allow: ["com", "net"] },
    })
    .min(constants.LIMIT_LENGTH_EMAIL.min)
    .max(constants.LIMIT_LENGTH_EMAIL.max)
    .required(),
  password: Joi.string()
    .min(constants.LIMIT_LENGTH_PASSWORD.minLength)
    .max(constants.LIMIT_LENGTH_PASSWORD.maxLength)
    .required(),
});

const joiSchemaRegister = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: constants.MIN_DOMAIN_SEGMENTS,
      tlds: { allow: ["com", "net"] },
    })

    .pattern(
      /^((([0-9A-Za-z\.]{1}[-0-9A-z\.]{1,}))@([-0-9A-z]{1,}\.){1,2}[A-Za-z]{2,})$/
    )
    .min(constants.LIMIT_LENGTH_EMAIL.min)
    .max(constants.LIMIT_LENGTH_EMAIL.max)
    .required(),
  password: Joi.string()
    .pattern(/^[a-zA-Zа-яА-Я0-9їЇіІєЄ]+$/)
    .min(constants.LIMIT_LENGTH_PASSWORD.minLength)
    .max(constants.LIMIT_LENGTH_PASSWORD.maxLength)
    .required(),
  userName: Joi.string()
    .pattern(/^[a-zA-Zа-яА-Я0-9їЇіІєЄ\\ ]+$/)
    .min(constants.LIMIT_LENGTH_NAME.minLength)
    .max(constants.LIMIT_LENGTH_NAME.maxLength)
    .required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiSchemaRegister,
  joiSchemaLogIn,
};
