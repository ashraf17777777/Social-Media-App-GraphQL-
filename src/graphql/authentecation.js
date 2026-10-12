
import jwt from 'jsonwebtoken';
import { User } from '../DB/models/user.model.js';


export const isAuthonticated = (Roles) => {
    return (resolver) => {
        return async (parent, args, context) => {
            // get token from headers
            const { authorization } = context // headers => req.headers
            if (!authorization || !authorization.startsWith("Bearer")) {
                throw new Error("token not found")
            }
            //extact token
            const token = authorization.split(" ")[1]// ["Bearer","token"]
            // verify token
            const { id } = jwt.verify(token, "123")
            const user = await User.findById(id).select("-password")
            if (!user) {
                throw new Error("USER NOT FOUND")
            }
            //check user role
            if (Roles?.length && !Roles.includes(user.role)) {
                throw new Error("UNAUTHORIZED")
            }
            context.user = user;
            // getOnePost
            return resolver(parent, args, context)
        }
    }
}
