import Joi from "joi";

export const userValidschema= Joi.object({
    email:Joi.string().email().lowercase().min(5).max(55).trim().required(),
    password:Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required(),
    firstName:Joi.string().min(3).max(55).trim().required(),
    lastName:Joi.string().min(3).max(55).trim().required(),
    gender:Joi.string().trim().valid("male","female","preferNotToSet").required(),
    dob: Joi.date().required(),
    role:Joi.string().required().valid("seller","buyer")
})


export const loginValidationSchema= Joi.object({
    email:Joi.string().email().trim().required(),
    password:Joi.string().required(),

})