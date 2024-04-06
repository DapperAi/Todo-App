import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";

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
        <Input clearable bordered placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input clearable bordered type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" color="primary" ghost>
          {isLoginMode ? "Login" : "Register"}
        </Button>
        <Button type="button" color="secondary" ghost onClick={() => setIsLoginMode(!isLoginMode)}>
          {isLoginMode ? 'Switch to Register' : 'Switch to Login'}
        </button>
      </form>
    </div>
  );
};

export default UserAuth;