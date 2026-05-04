import React, { useState } from 'react';
import { OTPInput } from '@ar-coder/otp-pro-input/react';

export default function App() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleComplete = (code: string) => {
    setLoading(true);
    console.log('Verifying code:', code);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (code === '123456') {
        alert('Success! Code is valid.');
      } else {
        setError(true);
      }
    }, 1500);
  };

  const reset = () => {
    setOtp('');
    setError(false);
    setLoading(false);
  };

  return (
    <div
      style={{
        background: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
        textAlign: 'center',
        maxWidth: '400px',
      }}
    >
      <h2 style={{ marginBottom: '8px' }}>Verify your account</h2>
      <p style={{ color: '#666', marginBottom: '24px' }}>
        Enter the 6-digit code we sent to your phone.
      </p>

      <div
        style={{
          marginBottom: '24px',
          opacity: loading ? 0.6 : 1,
          pointerEvents: loading ? 'none' : 'auto',
        }}
      >
        <OTPInput
          length={6}
          value={otp}
          onChange={(val) => {
            setOtp(val);
            if (error) setError(false);
          }}
          onComplete={handleComplete}
          error={error}
          disabled={loading}
        />
      </div>

      {loading && <p style={{ color: '#007bff', fontWeight: 'bold' }}>Verifying...</p>}
      {error && (
        <p style={{ color: '#dc3545', fontWeight: 'bold' }}>Invalid code. Please try again.</p>
      )}

      <div style={{ marginTop: '32px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <button
          onClick={() => setError(!error)}
          style={{
            padding: '8px 16px',
            background: '#f8f9fa',
            border: '1px solid #ddd',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          {error ? 'Clear Error' : 'Force Error'}
        </button>
        <button
          onClick={reset}
          style={{
            padding: '8px 16px',
            background: '#f8f9fa',
            border: '1px solid #ddd',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Reset Demo
        </button>
      </div>

      <div style={{ marginTop: '20px', fontSize: '12px', color: '#999' }}>
        Try pasting "123456" from anywhere!
      </div>
    </div>
  );
}
