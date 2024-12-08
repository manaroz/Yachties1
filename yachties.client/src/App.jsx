import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Yachts from './components/Yachts';
import Register from './components/Register';
import Login from './components/Login';
import BookingYacht from './components/BookingYacht';
import './App.css';

function App() {
    return (
        <Router>
            <div>
                <nav style={{ background: '#f8f9fa', padding: '10px 0' }}>
                    <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'center', margin: 0, padding: 0 }}>
                        <li style={{ margin: '0 10px' }}><Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>Home</Link></li>
                        <li style={{ margin: '0 10px' }}><Link to="/yachts" style={{ textDecoration: 'none', color: '#007bff' }}>Yachts</Link></li>
                        <li style={{ margin: '0 10px' }}><Link to="/register" style={{ textDecoration: 'none', color: '#007bff' }}>Register</Link></li>
                        <li style={{ margin: '0 10px' }}><Link to="/login" style={{ textDecoration: 'none', color: '#007bff' }}>Login</Link></li>
                        <li style={{ margin: '0 10px' }}><Link to="/booking" style={{ textDecoration: 'none', color: '#007bff' }}>Book a Yacht</Link></li>
                    </ul>
                </nav>

                <div style={{ padding: '20px' }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/yachts" element={<Yachts />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/booking" element={<BookingYacht />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;