import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackToHome from './BackToHome';

function BookingYacht() {
    const [yachts, setYachts] = useState([]);
    const [formData, setFormData] = useState({
        yachtId: '',
        startDate: '',
        endDate: '',
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchYachts = async () => {
            try {
                const response = await axios.get('https://localhost:7051/api/yachts');
                setYachts(response.data);
            } catch (error) {
                console.error('Error fetching yachts:', error);
            }
        };
        fetchYachts();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:5173/api/bookings', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store the token in localStorage after login
                }
            });
            setMessage('Booking successful!');
        } catch (error) {
            setMessage('Booking failed. Please try again.');
            console.error('Error:', error);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <BackToHome />
            <h2 style={{ textAlign: 'center' }}>Book a Yacht</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <select
                    name="yachtId"
                    value={formData.yachtId}
                    onChange={handleChange}
                    required
                    style={{ margin: '10px 0', padding: '10px', fontSize: '16px' }}
                >
                    <option value="">Select a yacht</option>
                    {yachts.map(yacht => (
                        <option key={yacht.id} value={yacht.id}>{yacht.name}</option>
                    ))}
                </select>
                <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    style={{ margin: '10px 0', padding: '10px', fontSize: '16px' }}
                />
                <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
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
                }}>Book</button>
            </form>
            {message && <p style={{ textAlign: 'center', color: message.includes('successful') ? 'green' : 'red' }}>{message}</p>}
        </div>
    );
}

export default BookingYacht;
