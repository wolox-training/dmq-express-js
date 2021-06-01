const validatePassword = value => /[a-zA-z0-9]{8,}$/i.test(value);

module.exports = { validatePassword };
