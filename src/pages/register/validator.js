const Validator = () => {
  const EmailFormat = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const PasswordLength = (password) => {
    return password.length >= 8;
  };

  const PasswordUppercase = (password) => {
    const regex = /[A-Z]/;
    return regex.test(password);
  };

  const PasswordHasNumber = (password) => {
    const regex = /\d/;
    return regex.test(password);
  };

  const PasswordSpecialCharacter = (password) => {
    const regex = /[^a-zA-Z0-9]/;
    return regex.test(password);
  };

  return {
    EmailFormat,
    PasswordLength,
    PasswordUppercase,
    PasswordHasNumber,
    PasswordSpecialCharacter
  };
};

export default Validator;
