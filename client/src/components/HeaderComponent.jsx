import React from 'react';
import { Link } from 'react-router-dom';

function HeaderComponent({ user,  logoutHandler}) {
  return (
    <header>
      <img
        style={{ width: '70px' }}
        src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg"
        alt="logo"
      />
      {!user ? (<p>Guest</p>
      ) : (
        <p>{user.name}</p>
      )}
      <nav>
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/signup">
            <li>Sign up</li>
          </Link>
          <Link to="/login">
            <li>Login</li>
          </Link>
        </ul>
        <button onClick={logoutHandler}>Logout</button>
      </nav>
    </header>
  );
}

export default HeaderComponent;