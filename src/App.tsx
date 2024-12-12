import './assets/scss/app.scss';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router';
import { ToastContainer } from 'react-toastify';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import SignupPage from './pages/SignupPage';
import Navigation from './pages/Navigation';
import ProfilePage from './pages/ProfilePage';
import GamePage from './pages/GamePage';
import HighscorePage from './pages/HighscorePage';
import Footer from './components/Footer';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div id="appId">
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
          {/* Auth routes */}
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/highscore" element={<HighscorePage />} />
        </Routes>
      </main>
      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={2500}
        theme="colored"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
      />
    </div>
  );
}

export default App;
