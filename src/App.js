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
import { DialogProvider } from './context/dialog';
import { CascadingMenuProvider } from './context/cascadingMenuContext';
import { CohortProvider } from './context/myCohortCourseContext';
import Welcome from './pages/welcome';
import Searching from './pages/searching';
import ActionSuccess from './components/actionSuccess';
import CohortPage from './pages/cohort';
import { UserContextProvider } from './context/userContext';

const App = () => {
  return (
    <>
      <AuthProvider>
        <ModalProvider>
          <CascadingMenuProvider>
            <DialogProvider>
              <UserContextProvider>
                <CohortProvider>
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
                    <Route
                      path="cohort"
                      element={
                        <ProtectedRoute disabledNav={true}>
                          <CohortPage />
                        </ProtectedRoute>
                      }
                      />
                  </Routes>
                  <ActionSuccess />
                </CohortProvider>
              </UserContextProvider>
            </DialogProvider>
          </CascadingMenuProvider>
        </ModalProvider>
      </AuthProvider>
    </>
  );
};

export default App;
