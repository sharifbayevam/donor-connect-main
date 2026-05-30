import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Donors from './components/Donor';
import News from './components/News';
import Registr from './pages/Registr';


export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [donors, setDonors] = useState<any[]>([]);

  // MongoDB bazasidagi haqiqiy donorlarni yuklab olish (Statistika to'g'ri ishlashi uchun)
  const fetchDonors = () => {
    fetch('http://localhost:5000/api/donors')
      .then((res) => {
        if (!res.ok) throw new Error("Server xatosi");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setDonors(data);
        }
      })
      .catch((err) => console.error("Xatolik:", err));
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  // Ro'yxatdan o'tgandan keyin bazani qayta yangilash funksiyasi
  const handleAddNewDonor = () => {
    fetchDonors(); // MongoDB ga yangi donor qo'shilgach, ro'yxatni qayta tortadi
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} donors={donors} />;
      case 'donors':
        return <Donors donors={donors} setDonors={setDonors} />;
      case 'news':
        return <News />;
      case 'registr':
        return <Registr addNewDonor={handleAddNewDonor} setCurrentPage={setCurrentPage} />;
      default:
        return <Home setCurrentPage={setCurrentPage} donors={donors} />;
    }
  };

  return (
    <BrowserRouter>
      <div style={{ backgroundColor: '#1a0508', minHeight: '100vh', color: '#ffffff' }}>
        
        {/* NAVIGATSIYA MENYUSI */}
        <header style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: '80px',
          backgroundColor: 'rgba(26, 5, 8, 0.9)', backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '0 8%', zIndex: 1000
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setCurrentPage('home')}>
            <span style={{ fontSize: '1.8rem' }}>🩸</span>
            <span style={{ fontSize: '1.5rem', fontWeight: '800' }}>Donor<span style={{ color: '#ef4444' }}>.uz</span></span>
          </div>

          <nav style={{ display: 'flex', gap: '15px' }}>
            <button style={{ padding: '10px 20px', borderRadius: '30px', border: 'none', cursor: 'pointer', fontWeight: '600', backgroundColor: currentPage === 'home' ? '#ef4444' : 'transparent', color: '#ffffff' }} onClick={() => setCurrentPage('home')}>Bosh sahifa</button>
            <button style={{ padding: '10px 20px', borderRadius: '30px', border: 'none', cursor: 'pointer', fontWeight: '600', backgroundColor: currentPage === 'donors' ? '#ef4444' : 'transparent', color: '#ffffff' }} onClick={() => setCurrentPage('donors')}>Donorlar qidirish</button>
            <button style={{ padding: '10px 20px', borderRadius: '30px', border: 'none', cursor: 'pointer', fontWeight: '600', backgroundColor: currentPage === 'registr' ? '#ef4444' : 'transparent', color: '#ffffff' }} onClick={() => setCurrentPage('registr')}>Ro'yxatdan o'tish</button>
            <button style={{ padding: '10px 20px', borderRadius: '30px', border: 'none', cursor: 'pointer', fontWeight: '600', backgroundColor: currentPage === 'news' ? '#ef4444' : 'transparent', color: '#ffffff' }} onClick={() => setCurrentPage('news')}>Tibbiy maslahatlar</button>
          </nav>
        </header>
        
        <main style={{ paddingTop: '90px' }}>
          {renderPage()}
        </main>

      </div>
    </BrowserRouter>
  );
}