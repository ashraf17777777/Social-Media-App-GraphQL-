export const validate = (schema) => {
    return (req, res, next) => {
        const data = { ...req.body, ...req.params, ...req.query };
        if (req.file || req.files?.length) {
            data.file = req.file || req.files
        }
        const result = schema.validate(data);
        if (result.error) {
            const resultMessage = result.error.details.map((detail) => detail.message)
            next(new Error(resultMessage, { cause: 400 }))
        }
        next()
    }
}