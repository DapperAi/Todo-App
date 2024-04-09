import React, { useState } from "react";
import { Input, Button, Modal, ModalHeader, ModalBody } from "@nextui-org/react";

// UserAuth handles user login and registration

// UserAuth handles user login and registration
const UserAuth = ({ onAuthSuccess }: { onAuthSuccess: () => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let response : Response;
      if(isLoginMode) {
        response = await fetch('http://localhost:3000/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ emailId: username, password }),
        });
      } else {
        response = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ emailId: username, password }),
        });
      }
      const data = await response.json()
      if(data.success === true && isLoginMode) {
        onAuthSuccess();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Authentication failed', error);
      setShowModal(true);
      // Automatically close the modal after 3 seconds
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
    }
  };

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
      <Modal closeButton aria-labelledby="modal-title" isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalHeader>
          <h2 id="modal-title">
            Authentication Error
          </h2>
        </ModalHeader>
        <ModalBody>
          <p>Authentication failed. Please try again.</p>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default UserAuth;