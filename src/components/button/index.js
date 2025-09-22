const Button = ({ text, children, onClick, type = 'button', classes, disabled = false }) => {
  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children ?? text}
    </button>
  );
};

export default Button;
