import React from 'react';

// TypeScript uchun proplarni to'g'ri e'lon qilamiz
interface HeaderProps {
  setCurrentPage: (page: string) => void; // Mana shu qator qizil chiziqni yo'qotadi
  currentPage: string;
}

export default function Header({ setCurrentPage, currentPage }: HeaderProps) {
  
  // Tugmalar uchun stillar funksiyasi
  const linkStyle = (isActive: boolean) => ({
    padding: '10px 24px',
    borderRadius: '30px',
    backgroundColor: isActive ? '#ef4444' : 'transparent',
    color: '#ffffff',
    border: 'none',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: '"Segoe UI", Roboto, sans-serif',
    boxShadow: isActive ? '0 4px 15px rgba(239, 68, 68, 0.4)' : 'none',
  });

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '80px',
      backgroundColor: 'rgba(26, 5, 8, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 8%',
      zIndex: 1000
    }}>
      {/* Logotip qismi */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setCurrentPage('home')}>
        <span style={{ fontSize: '1.8rem' }}>🩸</span>
        <span style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
          Donor<span style={{ color: '#ef4444' }}>.uz</span>
        </span>
      </div>

      {/* Navigatsiya tugmalari */}
      <nav style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <button style={linkStyle(currentPage === 'home')} onClick={() => setCurrentPage('home')}>
          Bosh sahifa
        </button>
        <button style={linkStyle(currentPage === 'donors')} onClick={() => setCurrentPage('donors')}>
          Donorlar qidirish
        </button>
        <button style={linkStyle(currentPage === 'registr')} onClick={() => setCurrentPage('registr')}>
          Ro'yxatdan o'tish
        </button>
        <button style={linkStyle(currentPage === 'news')} onClick={() => setCurrentPage('news')}>
          Tibbiy maslahatlar
        </button>
      </nav>
    </header>
  );
}