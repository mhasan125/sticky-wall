import React, { useState } from 'react';
import { Button, Divider, Form, Input, Typography, message } from 'antd';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useAuthContext } from '../../Context/AuthContext';
import {useNavigate } from 'react-router-dom';

const { Title } = Typography;

export default function Login() {
  const { readUserProfile } = useAuthContext();
  const navigate = useNavigate()
  const [state, setState] = useState({ email: '', password: '' });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  
  const handleRestPassword = (e) => {
    e.preventDefault();
    const auth = getAuth();
    let {email}=state
sendPasswordResetEmail(auth, email,
    // url("http://localhost:3000/auth/login")
    )
  .then(() => {
    message.success("Check your Email")
    setTimeout(() => {
        navigate("/auth/login")
    }, 1000);
  })
  .catch((error) => {
    // const errorCode = error.code;
    // const errorMessage = error.message;
    message.error("There is an error while sending link")
    // ..
  });

  };
  
 
  return (
    <main className="auth">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card p-3 p-md-4">
              <Title level={2} className="m-0 text-center">Reset Password</Title>

              <Divider />

              <Form layout="vertical">
                <Form.Item label="Email">
                  <Input placeholder="Input your email"name="email"onChange={handleChange}/>
                </Form.Item>
                <Button type="primary"htmlType="submit"className="w-100"loading={isProcessing}onClick={handleRestPassword}>Reset Password</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
