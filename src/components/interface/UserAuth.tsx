import React, { useState } from "react";
import { Input, Button, Tooltip } from "@nextui-org/react";

// UserAuth handles user login and registration
const UserAuth = ({ onAuthSuccess }: { onAuthSuccess: () => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/auth', {
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailId: username, password }),
      });
      const data = await response.text();
      console.log(data);
      if (isLoginMode) onAuthSuccess();
    } catch (error) {
      console.error('Authentication failed', error);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleAuth}>
      <div className="flex flex-col gap-4">
        <Input isClearable={true} placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input isClearable={true} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="flex flex-row gap-4">
          <Button type="submit" color="primary">
            {isLoginMode ? "Login" : "Register"}
          </Button>
          <Button type="button" color="secondary" onClick={() => setIsLoginMode(!isLoginMode)}>
            {isLoginMode ? 'Switch to Register' : 'Switch to Login'}
          </Button>
        </div>
        </div>
      </form>
    </div>
  );
};

export default UserAuth;