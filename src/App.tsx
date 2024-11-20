import './assets/scss/app.scss';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router';
import { ToastContainer } from 'react-toastify';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Auth routes */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        theme="colored"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
      />
    </>
  );
}

export default App;
