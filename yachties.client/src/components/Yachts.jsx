import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackToHome from './BackToHome';
import yacht1Image from '../assets/yachts/yacht1.jpg';
import yacht2Image from '../assets/yachts/yacht2.jpg';
import yacht3Image from '../assets/yachts/yacht3.jpg';
import yacht4Image from '../assets/yachts/yacht4.jpg';
import yacht5Image from '../assets/yachts/yacht5.jpg';
import yacht6Image from '../assets/yachts/yacht6.jpg';

const yachtImages = {
    1: yacht1Image,
    2: yacht2Image,
    3: yacht3Image,
    4: yacht4Image,
    5: yacht5Image,
    6: yacht6Image
};

function Yachts() {
    const [yachts, setYachts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchYachts = async () => {
            try {
                console.log("Fetching yachts...");
                const response = await axios.get('https://localhost:5174/api/yachts');
                console.log("API response:", response);
                console.log("Yachts data:", response.data);

                if (Array.isArray(response.data)) {
                    setYachts(response.data);
                } else {
                    console.error("API did not return an array:", response.data);
                    setYachts([]);
                }
            } catch (err) {
                console.error('Error fetching yachts:', err);
                setError('Error fetching yachts. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchYachts();
    }, []);

    console.log("Current yachts state:", yachts);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    console.log("Rendering yachts:", yachts);

    return (
        <div>
            <BackToHome />
            <h2>Available Yachts</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                {Array.isArray(yachts) && yachts.length > 0 ? (
                    yachts.map(yacht => (
                        <div key={yacht.id} style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '15px',
                            margin: '10px',
                            width: '250px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>
                            <img
                                src={yachtImages[yacht.id] || '../assets/yachts/default-yacht.jpg'}
                                alt={yacht.name}
                                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                            />
                            <h3>{yacht.name}</h3>
                            <p>Capacity: {yacht.capacity}</p>
                            <p>Price per day: ${yacht.pricePerDay}</p>
                            <button style={{
                                backgroundColor: '#4CAF50',
                                border: 'none',
                                color: 'white',
                                padding: '10px 20px',
                                textAlign: 'center',
                                textDecoration: 'none',
                                display: 'inline-block',
                                fontSize: '16px',
                                margin: '4px 2px',
                                cursor: 'pointer',
                                borderRadius: '4px'
                            }}>Book Now</button>
                        </div>
                    ))
                ) : (
                    <p>No yachts available</p>
                )}
            </div>
        </div>
    );
}

export default Yachts;
