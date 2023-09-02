import React, { useState } from 'react';
import { Button, Divider, Form, Input, Typography, message } from 'antd';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContext';
import { auth } from '../../Config/firebase';

const { Title } = Typography;

export default function Login() {
  const { readUserProfile } = useAuthContext();
  const [state, setState] = useState({ email: '', password: '' });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  
  const handleLogin = (e) => {
    e.preventDefault();

    let { email, password } = state;

    setIsProcessing(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        readUserProfile(user);
      })
      .catch((err) => {
        message.error('Something went wrong while signing user');
        console.error(err);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };
  
 
  return (
    <main className="auth">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card p-3 p-md-4">
              <Title level={2} className="m-0 text-center">Login</Title>

              <Divider />

              <Form layout="vertical">
                <Form.Item label="Email">
                  <Input placeholder="Input your email"name="email"onChange={handleChange}/>
                </Form.Item>
                <Form.Item label="Password">
                  <Input.Password placeholder="Input your password"name="password"onChange={handleChange}/>
                </Form.Item>

                <Button type="primary"htmlType="submit"className="w-100"loading={isProcessing}onClick={handleLogin}>Login</Button>
              </Form>
              <Link to="/auth/register" className="text-center mt-3 nav-link">Create the account</Link>
              <Link to="/auth/forgot-password" className="text-center mt-3 nav-link">Forget Password</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
