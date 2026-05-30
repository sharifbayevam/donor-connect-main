import React, { useState } from 'react';

interface RegistrProps {
  addNewDonor: () => void;
  setCurrentPage: (page: string) => void;
}

export default function Registr({ addNewDonor, setCurrentPage }: RegistrProps) {
  const [name, setName] = useState('');
  const [bloodGroup, setBloodGroup] = useState('1'); // yoki sizning backend qanday qabul qilsa
  const [city, setCity] = useState('Toshkent');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone) {
      alert("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    // MONGODB'ga POST so'rovi yuborish
    fetch('http://localhost:5000/api/donors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, bloodGroup, city, phone })
    })
    .then(res => {
      if(!res.ok) throw new Error("Saqlashda xatolik yuz berdi");
      return res.json();
    })
    .then(() => {
      alert("Muvaffaqiyatli ro'yxatdan o'tdingiz va ma'lumotlar MongoDB'ga saqlandi! 🎉");
      addNewDonor(); // App.tsx dagi stateni yangilatadi
      setCurrentPage('donors');
    })
    .catch(err => alert(err.message));
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '30px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px' }}>
      <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: '25px' }}>Donor Sifatida <span style={{ color: '#ef4444' }}>Ro'yxatdan O'tish</span></h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <input type="text" placeholder="Ismingiz" value={name} onChange={e => setName(e.target.value)} style={{ padding: '12px', background: '#0d0204', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }} />
        <input type="text" placeholder="Guruh (Masalan: 1, 2, 3)" value={bloodGroup} onChange={e => setBloodGroup(e.target.value)} style={{ padding: '12px', background: '#0d0204', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }} />
        <input type="text" placeholder="Shahar" value={city} onChange={e => setCity(e.target.value)} style={{ padding: '12px', background: '#0d0204', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }} />
        <input type="text" placeholder="Telefon" value={phone} onChange={e => setPhone(e.target.value)} style={{ padding: '12px', background: '#0d0204', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }} />
        <button type="submit" style={{ background: '#ef4444', color: '#fff', padding: '14px', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>Tasdiqlash ✨</button>
      </form>
    </div>
  );
}