import React, { useState } from 'react';

// UserAuth handles user login and registration
const UserAuth = ({ onAuthSuccess }: { onAuthSuccess: () => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for authentication logic
    console.log(username, password);
    onAuthSuccess();
  };

  return (
    <div className="p-4">
      <form onSubmit={handleAuth}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">{isLoginMode ? 'Login' : 'Register'}</button>
        <button type="button" onClick={() => setIsLoginMode(!isLoginMode)}>
          {isLoginMode ? 'Switch to Register' : 'Switch to Login'}
        </button>
      </form>
    </div>
  );
};

export default UserAuth;