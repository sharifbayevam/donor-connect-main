import React, { useState, useEffect } from 'react';
import './News.css';

interface ArticleType {
  id: number;
  title: string;
  excerpt: string;
  content: string[];
  tag: string;
  date: string;
  source: string;
  readTime: string;
  icon: string;
}

export default function News() {
  const [selectedArticle, setSelectedArticle] = useState<ArticleType | null>(null);
  const [time, setTime] = useState(new Date());

  // Real vaqt hisoblagichi (Elektron soat uchun)
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const articles: ArticleType[] = [
    {
      id: 1,
      icon: "🩸",
      tag: "Tavsiya",
      title: "Qon topshirishdan oldin va keyin nimalarga e'tibor berish kerak?",
      excerpt: "Donorlikdan 24 soat oldin yog'li ovqatlardan voz keching, ko'p suyuqlik iching. Topshirgandan so'ng esa og'ir jismoniy mehnatdan saqlanish tavsiya etiladi.",
      readTime: "4 daqiqa",
      date: "30.05.2026",
      source: "Sog'liqni saqlash vazirligi",
      content: [
        "Qon topshirish — nafaqat boshqalar hayotini qutqarish, balki donorning o'z sog'lig'i uchun ham va uning tomirlarini yangilanishi uchun juda foydali jarayondir.",
        "Donorlikdan 24 soat oldin: Gazlangan, spirtli va energetik ichimliklardan butunlay voz keching. Yog'li, qovurilgan, dudlangan ovqatlar, tuxum va sut mahsulotlarini iste'mol qilmaganingiz ma'qul. O'rniga donli bo'tqalar, meva va sabzavotlar iste'mol qiling.",
        "Ertalabki tayyorgarlik: Hech qachon qon topshirishga och qoringa kelmang! Yengil nonushta (shirin choy, quruq non yoki pechenye) qilib oling.",
        "Qon topshirgandan keyin: Tibbiyot xodimi bog'lagan bintni kamida 2-3 soat yechmang. Kun davomida kamida 2 litr toza suv iching."
      ]
    },
    {
      id: 2,
      icon: "🩺",
      tag: "Tibbiyot maslahati",
      title: "Kimlar donor bo'la olmaydi? Mutaxassis javobi",
      excerpt: "Surunkali kasalliklar (gepatit, qandli diabet, gipertoniya) bor insonlar, yaqin orada tish oldirganlar yoki tatuirovka chizdirganlar ma'lum muddat donorlik qila olmaydilar.",
      readTime: "5 daqiqa",
      date: "28.05.2026",
      source: "Qon quyish markazi",
      content: [
        "Ko'pchilik insonlar donor bo'lishni xohlasalar-da, tibbiy ko'rikdan o'ta olmasliklari mumkin. Donorlikda cheklovlar ikki turga bo'linadi: Mutloq (umrbod) va Vaqtincha cheklovlar.",
        "Mutloq cheklovlar: OIV (VICh), virusli gepatitlar (B va C), suyak va qon kasalliklari, xavfli o'smalar, qandli diabet va yurak xastaliklari bor bemorlar umrbod donor bo'la olmaydilar.",
        "Vaqtincha cheklovlar: Agar siz yaqin orada tana a'zolariga tatuirovka yoki pirsing qildirgan bo'lsangiz — 1 yil; stomatolog qabulida bo'lib tish oldirgan bo'lsangiz — 10 kun kutishingiz kerak."
      ]
    },
    {
      id: 3,
      icon: "💖",
      tag: "Sog'liq",
      title: "Qon topshirishning organizm uchun 5 ta kutilmagan foydasi",
      excerpt: "Muntazam qon topshirish yurak-qon tomir tizimini yangilaydi, qondagi ortiqcha temir moddasini kamaytiradi va organizmda yangi qon hujayralari ishlab chiqarilishini stimullaydi.",
      readTime: "3 daqiqa",
      date: "25.05.2026",
      source: "JSST tadqiqoti",
      content: [
        "Insonlar ko'pincha donorlikni faqat qabul qiluvchi uchun foydali deb o'ylashadi. Biroq, muntazam ravishda qon topshirib turish donorning o'zini ham ko'plab kasalliklardan himoya qiladi.",
        "1. Yurak xuruji xavfini kamaytiradi: Qondagi ortiqcha temir moddasi tomirlarni qattiqlashtiradi. Qon topshirganda qon suyuladi va yurak insult xavfidan 30% ga himoyalanadi.",
        "2. Yangilanish jarayoni: Organizm yo'qotilgan qon o'rnini to'ldirish uchun darhol yangi va faol qon hujayralarini ishlab chiqarishni boshlaydi. Bu immunitetni oshiradi."
      ]
    }
  ];

  if (selectedArticle) {
    return (
      <div className="news-page-container anim-fade-in">
        <div className="news-wrapper single-post-wrapper">
          <button className="back-btn-animated" onClick={() => setSelectedArticle(null)}>
            <span>← Ro'yxatga qaytish</span>
          </button>
          
          <article className="full-article-premium">
            <div className="article-header">
              <span className="premium-tag">{selectedArticle.tag}</span>
              <span className="read-time">⏱️ {selectedArticle.readTime} o'qish</span>
            </div>
            
            <h1 className="full-title-neon">{selectedArticle.title}</h1>
            
            <div className="full-meta-box">
              <span>📅 {selectedArticle.date}</span>
              <span>•</span>
              <span>Manba: <strong className="text-neon">{selectedArticle.source}</strong></span>
            </div>
            
            <div className="full-content-flow">
              {selectedArticle.content.map((p, idx) => (
                <p key={idx} className="article-paragraph-lux">{p}</p>
              ))}
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="news-page-container anim-fade-in">
      <div className="news-wrapper">
        
        {/* Sarlavha qismi */}
        <div className="news-title-box-luxury">
          <div className="heart-pulse-icon">🩺</div>
          <h1>Tibbiy <span>Maslahatlar</span></h1>
          <p>Siz va yaqinlaringiz salomatligi uchun eng sara va foydali ma'lumotlar to'plami</p>
          <div className="luxury-line"></div>
        </div>

        {/* --- RAQAMLI JONLI SOAT BLOKI SHU YERDA --- */}
        <div className="urgent-clock-box header-clock-margin">
          <div className="digital-clock-display">
            {formatTime()}
          </div>
          <div className="urgent-text-content">
            <h3>Qon topshirish vaqtingiz kelgandir balki?</h3>
            <p>Shoshiling! Sizning 15 daqiqa vaqtingiz kimningdir butun umrini qutqarishi mumkin.</p>
          </div>
        </div>

        {/* Maqolalar ro'yxati */}
        <div className="news-grid-premium">
          {articles.map((item) => (
            <div key={item.id} className="news-card-premium" onClick={() => setSelectedArticle(item)}>
              <div className="card-top-content">
                <div className="card-header-row">
                  <span className="premium-tag">{item.tag}</span>
                  <span className="card-icon-emoji">{item.icon}</span>
                </div>
                <h2>{item.title}</h2>
                <p>{item.excerpt}</p>
              </div>
              <div className="news-footer-lux">
                <div className="news-meta-lux">
                  <span className="date-badge">📅 {item.date}</span>
                  <span>⏱️ {item.readTime}</span>
                </div>
                <div className="arrow-circle">
                  <span className="arrow-move">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}