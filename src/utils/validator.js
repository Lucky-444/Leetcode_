const validator = require('validator');

const validate = (data) => {
    const errors = {};


    if (!data.email || !data.password || !data.age || !data.role) {
        errors.missingFields = 'All fields are required';
    }

    if (!validator.isEmail(data.email)) {
        errors.email = 'Invalid email format';
    }

    if (!validator.isLength(data.password, { min: 4 })) {
        errors.password = 'Password must be at least 4 characters long';
    }

    
    if (!validator.isInt(String(data.age), { min: 0 })) {
        errors.age = 'Age must be a positive integer';
    }

    if (Object.keys(errors).length > 0) {
        throw new Error(JSON.stringify(errors));
    }
}

module.exports = validate;
