// import joi from "joi";
// // // data
// // const age = "19";
// // // schema
// // const schema = joi.number().min(18).max(100).required();
// // // compare
// // const result = schema.validate(age)

// // console.log(result)

// // data
// const person = {
//     name:"david",
//     age:"19",
//     email:"david@yahoo.com",
//     isMarried:false,
//     password:"21234",
//     confirmPassword:"21234",
//     skills :[{frontend:["html","css","js"]}]
// }
// // schema
// const schema = joi.object({
//     name:joi.string().min(3).max(20).required(),
//     age:joi.number().min(18).max(100).required(),
//     email:joi.string().email().required(),
//     isMarried:joi.boolean().required(),
//     password:joi.string().pattern(new RegExp(/^[a-zA-Z0-9]{3,30}$/)).required(),
//     confirmPassword:joi.ref("password"),
//     skills:joi.array().items(joi.object({frontend:joi.array().items(joi.string())})).min(1).max(5).required()
// }).required()
// // compare
// const result = schema.validate(person,{abortEarly:false})
// console.log(result)
