import bcrypt from "bcrypt";

export const hash = ({plantext, salt})=>{
    return bcrypt.hashSync(plantext, salt);
}

export const compareSynchash = ({plantext, hash})=>{
    return bcrypt.compareSync(plantext, hash);
}