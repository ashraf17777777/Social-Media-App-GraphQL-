const isAuthorized = (...role) => {
    return (req, res, next) => {
        if (role.includes(req.user.role)) {
            next()
        }else{
            next(new Error("un authorized", { cause: 403 })) 
        }
    }
}

export default isAuthorized