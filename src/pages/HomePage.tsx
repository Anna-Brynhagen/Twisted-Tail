import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <>
      <div>
        <Link to="/signup">Sign up</Link>
      </div>
      <div>
        <Link to="/login">Login</Link>
      </div>
      <div>
        <Link to="/logout">Logout</Link>
      </div>
    </>
  );
}

export default HomePage;
