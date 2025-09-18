import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Register from './pages/register';
import Loading from './pages/loading';
import Profile from './pages/profile';
import Verification from './pages/verification';
import { AuthProvider, ProtectedRoute } from './context/auth';
import { ModalProvider } from './context/modal';
import { CascadingMenuProvider } from './context/cascadingMenuContext';
import Welcome from './pages/welcome';
import Searching from './pages/searching';

const App = () => {
  return (
    <>
      <AuthProvider>
        <ModalProvider>
          <CascadingMenuProvider>
            <Routes>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="loading" element={<Loading />} />
              <Route path="verification" element={<Verification />} />

              <Route
                index
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="search"
                element={
                  <ProtectedRoute>
                    <Searching />
                  </ProtectedRoute>
                }
              />
              <Route
                path="welcome"
                element={
                  <ProtectedRoute disabledNav={true}>
                    <Welcome />
                  </ProtectedRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoute disabledNav={true}>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="profile/:id"
                element={
                  <ProtectedRoute disabledNav={true}>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </CascadingMenuProvider>
        </ModalProvider>
      </AuthProvider>
    </>
  );
};

export default App;
