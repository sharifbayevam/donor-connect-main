import React from 'react';
import './Home.css';

interface HomeProps {
  setCurrentPage: (page: string) => void;
  donors: any[]; // App.tsx dan kelayotgan haqiqiy ro'yxat
}

export default function Home({ setCurrentPage, donors }: HomeProps) {
  // Haqiqiy hayoti saqlanganlar (Haqiqiy donorlar soniga qarab hisoblanadi)
  const realSavedLives = donors ? donors.length * 3 : 0; 

  return (
    <div className="home-page-container anim-fade-in">
      <div className="home-wrapper">
        
        {/* --- HERO SECTION (Asosiy banner) --- */}
        <div className="hero-section-premium">
          <div className="heart-pulse-glow">❤️</div>
          <h1 className="hero-title-neon">
            Donor Connect <br />
            <span>Platformasiga Xush Kelibsiz!</span>
          </h1>
          <p className="hero-subtitle">
            Bu yerda siz hayot qutqaruvchi donorlarni topishingiz, ular bilan tezkor 
            bog‘lanishingiz yoki o‘zingiz ham donor sifatida ro‘yxatdan o‘tib, kimningdir hayotini saqlab qolishingiz mumkin.
          </p>
          
          <div className="hero-action-buttons">
            <button className="btn-neon-primary" onClick={() => setCurrentPage('registr')}>
              🔥 Hoziroq donor bo'lish
            </button>
            <button className="btn-neon-secondary" onClick={() => setCurrentPage('donors')}>
              🔍 Donor qidirish
            </button>
          </div>
        </div>

        {/* --- STATISTIKA BLOKLARI --- */}
        <div className="stats-grid-luxury">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            {/* Real ro'yxatdan o'tgan haqiqiy donorlar soni */}
            <h2>{donors ? donors.length : 0} ta</h2>
            <p>Faol Donorlar</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🩸</div>
            <h2>{realSavedLives} ta</h2>
            <p>Hayoti Saqlanganlar</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <h2>12 daqiqa</h2>
            <p>O'rtacha bog'lanish</p>
          </div>
        </div>

        {/* --- INFO SECTION (Siz aytgan va yo'qolib ketgan pastki qism) --- */}
        <div className="info-section-lux">
          <h3>Nima uchun donor bo'lish kerak?</h3>
          <div className="info-bullets">
            <div className="bullet-item">
              <span className="bullet-check">✔</span>
              <p><strong>1 ta ehson — 3 ta hayot:</strong> Siz topshirgan qon komponentlari bir vaqtning o'zida uch kishiga yordam berishi mumkin.</p>
            </div>
            <div className="bullet-item">
              <span className="bullet-check">✔</span>
              <p><strong>Sog'liq uchun foydali:</strong> Muntazam qon topshirish yurak xastaliklari xavfini kamaytiradi va qonni yangilaydi.</p>
            </div>
          </div>
          
          <button className="btn-read-more" onClick={() => setCurrentPage('news')}>
            Batafsil tibbiy maslahatlarni o'qish →
          </button>
        </div>

      </div>
    </div>
  );
}