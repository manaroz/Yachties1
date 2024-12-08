import React from 'react';
import { Link } from 'react-router-dom';

function BackToHome() {
    console.log("Rendering BackToHome component");
    return (
        <div style={{ marginBottom: '20px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'blue' }} onClick={() => console.log("Back to Home clicked")}>
                &larr; Back to Home
            </Link>
        </div>
    );
}

export default BackToHome;