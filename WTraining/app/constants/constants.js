const VALIDATE_EMAIL = /^(([^<>(),;:\s@"]+(.[^<>(),;:\s@"]+)*)|(.+"))@((wolox+.)+[^<>()[,;:\s@"]{2,})$/i;
const VALIDATE_STRING = /^[A-Za-z]+$/i;
const SALT = 10;

module.exports = { VALIDATE_EMAIL, SALT, VALIDATE_STRING };
