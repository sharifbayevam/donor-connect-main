import React from 'react';

export default function DonorCard({ donor }: any) {
 // DonorCard.tsx ichidagi asosiy div stili taxminan shunday bo'lishi kerak:
return (
  <div style={{
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    borderRadius: '20px',
    padding: '25px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s ease'
  }}>
    {/* Kartochka ichidagi qolgan yozuvlaringiz... */}
    <h3 style={{ fontSize: '22px', marginBottom: '10px', color: '#e2e8f0' }}>{donor.name}</h3>
    <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '6px' }}>Shahar: {donor.city}</p>
    <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '6px' }}>Guruh: {donor.bloodGroup}</p>
    <p style={{ fontSize: '14px', color: '#94a3b8' }}>Telefon: {donor.phone}</p>
    
  </div>
);
}