import { useState } from 'react';
import Button from '../../components/button';
import TextInput from '../../components/form/textInput';
import useAuth from '../../hooks/useAuth';
import CredentialsCard from '../../components/credentials';
import Validator from './validator';
import './register.css';

const Register = () => {
  const { onRegister } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: [], password: [] });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setErrors((prev) => ({ ...prev, [name]: [] }));
  };

  const handleRegister = (e) => {
    console.log('handle register');

    e.preventDefault();

    const { email, password } = formData;
    const {
      EmailFormat,
      PasswordLength,
      PasswordUppercase,
      PasswordHasNumber,
      PasswordSpecialCharacter
    } = Validator();
    let valid = true;
    const newErrors = { email: [], password: [] };

    if (!EmailFormat(email)) {
      newErrors.email.push('Invalid email format');
      valid = false;
    }
    if (!PasswordLength(password)) {
      newErrors.password.push('Password must be at least 8 characters');
      valid = false;
    }
    if (!PasswordUppercase(password)) {
      newErrors.password.push('Password must contain at least one uppercase letter');
      valid = false;
    }
    if (!PasswordHasNumber(password)) {
      newErrors.password.push('Password must contain at least one number');
      valid = false;
    }
    if (!PasswordSpecialCharacter(password)) {
      newErrors.password.push('Password must contain at least one special character');
      valid = false;
    }
    setErrors(newErrors);

    if (valid) {
      onRegister(email, password);
    }
  };

  return (
    <div className="bg-blue register credentialpage">
      <CredentialsCard
        title="Register"
        socialLinksTitle="Or sign up with"
        altButtonTitle="Already a user?"
        altButtonLink="/login"
        altButtonText="Log in"
      >
        <div className="register-form">
          <form onSubmit={handleRegister}>
            <TextInput
              value={formData.email}
              onChange={onChange}
              type="text"
              name="email"
              label="Email *"
              errors={errors.email}
            />
            <TextInput
              value={formData.password}
              onChange={onChange}
              name="password"
              label="Password *"
              type="password"
              errors={errors.password}
            />
            <Button text="Sign up" type="submit" classes="green width-full" />
          </form>
        </div>
      </CredentialsCard>
    </div>
  );
};

export default Register;
