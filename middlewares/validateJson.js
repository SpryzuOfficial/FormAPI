const { validationResult } = require('express-validator');

const validateJson = (req = request, res = response, next) =>
{
    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        console.log(errors.array())
        const formatedErrors = errors.array().map(err => err.msg);

        return res.status(400).json({
            ok: false,
            errors: formatedErrors
        });
    }

    next();
}

module.exports = { validateJson };