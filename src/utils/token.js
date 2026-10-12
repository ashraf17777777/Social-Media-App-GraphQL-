import jwt from "jsonwebtoken"

export const createToken = (payload, jwtPass,options={}) => {

    return jwt.sign(payload, jwtPass,options);

}

export const verifyToken = (token, jwtPass) => {

    return jwt.verify(token, jwtPass);  

}