import React, { useState } from 'react';
import axios from 'axios';
import BackToHome from './BackToHome';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:5173/api/auth/login', formData);
            setMessage('Login successful!');
            // Here you might want to store the token in localStorage
            // localStorage.setItem('token', response.data.token);
        } catch (error) {
            setMessage('Login failed. Please try again.');
            console.error('Error:', error);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <BackToHome />
            <h2 style={{ textAlign: 'center' }}>Login</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    style={{ margin: '10px 0', padding: '10px', fontSize: '16px' }}
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    style={{ margin: '10px 0', padding: '10px', fontSize: '16px' }}
                />
                <button type="submit" style={{
                    backgroundColor: '#4CAF50',
                    border: 'none',
                    color: 'white',
                    padding: '15px 32px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'inline-block',
                    fontSize: '16px',
                    margin: '10px 0',
                    cursor: 'pointer',
                    borderRadius: '4px'
                }}>Login</button>
            </form>
            {message && <p style={{ textAlign: 'center', color: message.includes('successful') ? 'green' : 'red' }}>{message}</p>}
        </div>
    );
}

export default Login;
