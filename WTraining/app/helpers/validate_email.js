exports.validateEmail = value =>
  /^(([^<>(),;:\s@"]+(.[^<>(),;:\s@"]+)*)|(.+"))@((wolox)+\.+[^<>()[,;:\s@"]{2,})$/i.test(value);
