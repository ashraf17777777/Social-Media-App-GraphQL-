export const validation = (schema) => {
    return (resolver) => {
        return async (parent, args, context) => {
            const { error } = schema.validate(args, { abortEarly: false });
            if (error) {
                const resultMessage = error.details.map((detail) => detail.message)
                throw new Error(resultMessage, { cause: 400 })
            }
            return resolver(parent, args, context)
        }
    }
}