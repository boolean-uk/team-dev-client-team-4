import { useState, forwardRef } from 'react';
import './textInput.css';

const TextInput = forwardRef(({
  value,
  onChange,
  name,
  label,
  icon,
  actionIcon,
  onActionClick,
  type = 'text',
  errors = [],
  placeholder,
  disabled = false
}, ref) => {
  const [showpassword, setShowpassword] = useState(false);

  if (type === 'password') {
    return (
      <div className="inputwrapper">
        <label htmlFor={name}>{label}</label>
        <input
          ref={ref}
          type={showpassword ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={(e) => {
            onChange(e);
          }}
          disabled={disabled}
        />
        <button
          type="button"
          className={`showpasswordbutton formbutton ${showpassword === true && '__faded'}`}
          onClick={(e) => {
            e.preventDefault();
            setShowpassword(!showpassword);
          }}
        >
        </button>
        <ul className="error_list">
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="inputwrapper">
        {label && <label htmlFor={name}>{label}</label>}
        <input
          ref={ref}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={ icon ? 'input-has-icon' : actionIcon ? 'input-has-action-icon' : ''}
          disabled={disabled}
          placeholder={placeholder}
        />
        {icon && <span className="input-icon">{icon}</span>}

        {actionIcon && (
          <button
            type="button"
            className="action-icon-button"
            onClick={onActionClick}
          >
            {actionIcon}
          </button>
        )}

        <ul className="error_list">
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }
});

TextInput.displayName = 'TextInput';

export default TextInput;
