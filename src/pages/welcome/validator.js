const Validator = () => {
  const Required = (content) => {
    return content.length > 0;
  };
  return {
    Required
  };
};

export default Validator;
