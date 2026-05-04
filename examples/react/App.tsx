import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { OTPInput } from '../../src/adapters/react'; // Direct source import for example

function App() {
  const [otp, setOtp] = useState('');

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>React OTP Example</h1>
      <p>Enter your 6-digit code:</p>
      
      <OTPInput
        length={6}
        value={otp}
        onChange={setOtp}
        onComplete={(code) => alert(`OTP Complete: ${code}`)}
      />
      
      <div style={{ marginTop: '20px' }}>
        <strong>Current Value:</strong> {otp}
      </div>
      
      <button 
        onClick={() => setOtp('')}
        style={{ marginTop: '10px', padding: '8px 16px' }}
      >
        Clear OTP
      </button>
    </div>
  );
}

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
