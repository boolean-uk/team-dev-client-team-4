import { useState } from 'react';
import TextInput from '../../components/form/textInput';
import useAuth from '../../hooks/useAuth';
import CredentialsCard from '../../components/credentials';
import './login.css';
import { AuthContext } from '../../context/auth';

const Login = () => {
  const { onLogin } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const onChange = (e) => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="bg-blue login credentialpage">
      <CredentialsCard
        title="Login"
        socialLinksTitle="Or log in with"
        altButtonTitle="Need an account?"
        altButtonLink="/register"
        altButtonText="Sign up"
      >
        <div className="login-form">
          <form>
            <TextInput value={formData.email} onChange={onChange} name="email" label={'Email *'}/>
            <TextInput
              value={formData.password}
              onChange={onChange}
              name="password"
              label={'Password *'}
              type={'password'}
            />
          </form>

          {AuthContext.loginFailed
            ? (
            <text className="login-error">Failed to login! Please make sure your email and password are correct!</text>
              )
            : null}

          <button className="login-button width-full green" type="submit"
                  onClick={() => onLogin(formData.email, formData.password)}>
            Log in
          </button>
        </div>
      </CredentialsCard>
    </div>
  );
};

export default Login;
