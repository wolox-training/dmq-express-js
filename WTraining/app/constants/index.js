const validateEmail = /^(([^<>(),;:\s@"]+(.[^<>(),;:\s@"]+)*)|(.+"))@((wolox+.)+[^<>()[,;:\s@"]{2,})$/i;
const validatePassword = value => /[a-zA-z0-9]{8,}$/i.test(value);
const validateString = /^[A-Za-z]+$/i;

module.exports = { validateEmail, validatePassword, validateString };
