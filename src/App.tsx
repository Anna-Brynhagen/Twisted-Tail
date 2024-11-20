import { ToastContainer } from 'react-toastify';
import './assets/scss/app.scss';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
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
