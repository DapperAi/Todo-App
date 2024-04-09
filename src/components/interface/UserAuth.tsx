import React, { useState } from "react";
import { Input, Button, Modal, ModalHeader, ModalBody } from "@nextui-org/react";

// UserAuth handles user login and registration

// UserAuth handles user login and registration
const UserAuth = ({ onAuthSuccess }: { onAuthSuccess: () => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showAuthFailure, setShowAuthFailure] = useState(false);
  const [showUserRegistered, SetShowUserRegistered] = useState(false);
  const [isUserRegisterSuccess, SetIsUserRegisterSuccess] = useState(false);
  const [displayMessage, setDisplayMessage] = useState<string>("");

  async function handleLogin() {
    let response : Response;
    try {
      if (!username || !password) {
        setShowAuthFailure(true);
        setDisplayMessage("Email and password are required.");
        setTimeout(() => {
          setShowAuthFailure(false);
        }, 3000);
        return;
      }
      response = await fetch('http://localhost:3000/auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ emailId: username, password }),
          });
      const data = await response.json()
      if(data.success === true) {
        onAuthSuccess();
      } else {
        throw new Error(data.message)
      }
    } catch(err) {
      console.error('Authentication failed', err);
        setShowAuthFailure(true);
        setDisplayMessage((err as Error).message);
        setTimeout(() => {
          setShowAuthFailure(false);
        }, 3000);
    }
  }

  async function handleUserRegistration() {
    let response : Response;
    try {
      response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailId: username, password }),
      });
      const data = await response.json()
      if(data.success === true && isLoginMode) {
        SetShowUserRegistered(true);
        setDisplayMessage(data.message);
        setTimeout(() => {
          SetShowUserRegistered(false);
          SetIsUserRegisterSuccess(true);
        }, 3000);
      }
    } catch(err) {
      console.error('Registration failed', err);
      SetShowUserRegistered(true);
      setDisplayMessage((err as Error).message);
      SetIsUserRegisterSuccess(false);
      setTimeout(() => {
        SetShowUserRegistered(false);
      }, 3000);
    }
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
      if(isLoginMode) {
        handleLogin()       
      } else {
        handleUserRegistration();
      }
  };

  const renderModal = (heading: string, body: string): JSX.Element => {
    return (
      <Modal closeButton aria-labelledby="modal-title" isOpen={true}>
        <ModalHeader>
          <h2 id="modal-title">
            {heading}
          </h2>
        </ModalHeader>
        <ModalBody>
          <p>{body}</p>
        </ModalBody>
      </Modal>
    )
  }

  return (
    <div className="p-4">
      <form onSubmit={handleAuth}>
      <div className="flex flex-col gap-4">
        <Input isClearable={true} placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input isClearable={true} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="flex flex-row gap-4">
          <Button type="submit" color="primary" onClick={() => setIsLoginMode(true)}>
           Login
          </Button>
          <Button type="submit" color="secondary" onClick={() => setIsLoginMode(false)}>
           Resigter
          </Button>
        </div>
        </div>
      </form>

      {showAuthFailure && renderModal("Authentication Error", displayMessage)}
      {
        showUserRegistered ?
        isUserRegisterSuccess ?
          renderModal("Welcome to Tasklists!!", displayMessage)
          : 
          renderModal("Registration Error", displayMessage)
        : ""
      }
    </div>
  );
};

export default UserAuth;


