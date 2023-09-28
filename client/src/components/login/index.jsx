import React, { useState, useEffect } from 'react';
import { usePostLoginMutation, usePostSignUpMutation } from '@/state/api';

export const Login = ({ setUser, setSecret }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [triggerLogin, resultLogin] = usePostLoginMutation();

  const [triggerSignUp, resultSignUp] = usePostSignUpMutation();
  console.log('🚀 ~ file: index.jsx:13 ~ Login ~ resultSignUp:', resultSignUp);

  const handleLogin = () => {
    triggerLogin({ username, password });
  };
  const handleSignUp = () => {
    triggerSignUp({ username, password });
  };

  useEffect(() => {
    if (resultLogin.data?.response) {
      setUser(username);
      setSecret(password);
    }

    if (resultLogin.isError) {
      setError('Credentials are not correct. Please try again.');
    }
  }, [resultLogin.isError, resultLogin.data]); // eslint-disable-line

  useEffect(() => {
    if (resultSignUp.data?.response) {
      setUser(username);
      setSecret(password);
    }

    if (resultSignUp.isError) {
      setError('Credentials are not correct. Please try again.');
    }
  }, [resultSignUp.isError, resultSignUp.data]); // eslint-disable-line

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="title">Chat App</h2>

        <div>
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login-actions">
          {isRegister ? (
            <button type="button" onClick={handleSignUp}>
              Register
            </button>
          ) : (
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>
        <p
          className="register-change"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? 'Already a user?' : 'Are you new user?'}
        </p>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};
