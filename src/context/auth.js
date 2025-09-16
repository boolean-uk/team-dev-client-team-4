import { createContext, useEffect, useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import Header from '../components/header';
import Modal from '../components/modal';
import Navigation from '../components/navigation';
import useAuth from '../hooks/useAuth';
import { createProfile, login, register } from '../service/apiClient';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

const isIncompleteProfile = (rawToken) => {
  console.log('isIncompleteProfile called');
  try {
    const decoded = jwt_decode(rawToken);
    const email = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
    const username = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    if (!email || !username) return false;
    const result = email.toLowerCase() === username.toLowerCase();
    console.log(`isIncompleteProfile result: ${result} (email: ${email}, username: ${username})`);
    return result;
  } catch (err) {
    console.log('isIncompleteProfile error:', err);
    return false;
  }
};

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(null);
  const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });

  useEffect(() => {
    console.log('useEffect called');
    const storedToken = localStorage.getItem('token');
    // Use the latest token from state if available
    const activeToken = token || storedToken;
    console.log('Active token in useEffect:', activeToken);
    if (activeToken) {
      setToken(activeToken);
      if (isIncompleteProfile(activeToken)) {
        console.log('Navigating to /welcome from useEffect');
        navigate('/welcome', { replace: true });
      } else {
        console.log('Navigating to home from useEffect');
        navigate(location.state?.from?.pathname || '/', { replace: true });
      }
    }
  }, [token, location.state?.from?.pathname, navigate]);

  const handleLogin = async (email, password) => {
    console.log('handleLogin called');
    const res = await login(email, password);
    if (!res?.data?.token) {
      console.log('Login failed, navigating to /login');
      return navigate('/login');
    }
    const t = res.data.token;
    console.log('res: ', res);
    localStorage.setItem('token', t);
    setToken(t);

    if (isIncompleteProfile(t)) {
      console.log('Login: profile incomplete, navigating to /welcome');
      navigate('/welcome');
    } else {
      console.log('Login: profile complete, navigating to home');
      navigate(location.state?.from?.pathname || '/');
    }
  };

  const handleLogout = () => {
    console.log('handleLogout called');
    localStorage.removeItem('token');
    setToken(null);
  };

  const handleRegister = async (email, password) => {
    console.log('handleRegister called');
    const res = await register(email, password);
    const t = res.data.token;
    setToken(t);
    localStorage.setItem('token', t);
    setUserCredentials({ email, password }); // Store email and password
    navigate('/welcome');
  };

  const handleCreateProfile = async (
    firstName,
    lastName,
    username,
    githubUsername,
    mobile,
    bio
  ) => {
    console.log('handleCreateProfile called');
    const decoded = jwt_decode(token);
    const userId = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'];

    // Assume createProfile returns { data: { token: '...' } }
    await createProfile(userId, firstName, lastName, username, githubUsername, mobile, bio);

    const { email, password } = userCredentials; // Destructure email and password
    const res = await login(email, password);
    const t = res?.data?.token;
    console.log('Profile creation response:', res);
    console.log('res.data.token:', res?.data?.token);

    if (t) {
      console.log('Profile created, re-logging in and updating token');
      setToken(t);
      localStorage.setItem('token', t);
    } else {
      console.log('Profile created, but re-login failed or no token returned');
    }

    console.log('Navigating to home after profile creation');
    navigate('/');
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegister,
    onCreateProfile: handleCreateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  console.log('ProtectedRoute called, token:', token);

  if (!token) {
    console.log('ProtectedRoute: no token, navigating to /login');
    return <Navigate to={'/login'} replace state={{ from: location }} />;
  }

  // Optional guard: redirect mid-session if token still incomplete
  if (isIncompleteProfile(token) && location.pathname !== '/welcome') {
    console.log('ProtectedRoute: profile incomplete, navigating to /welcome');
    return <Navigate to="/welcome" replace />;
  }

  return (
    <div className="container">
      <Header />
      <Navigation />
      <Modal />
      {children}
    </div>
  );
};

export { AuthContext, AuthProvider, ProtectedRoute };
