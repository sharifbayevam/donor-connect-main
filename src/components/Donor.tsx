import React, { useState, useEffect } from 'react';
import './Donor.css';

interface DonorType {
  _id?: string; // MongoDB dagi id odatda _id bo'ladi
  id?: number;
  name: string;
  city?: string;
  region?: string;
  bloodGroup: string;
  phone: string;
}

interface DonorsProps {
  donors: DonorType[];
  setDonors: React.Dispatch<React.SetStateAction<DonorType[]>>;
}

export default function Donors({ donors, setDonors }: DonorsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('Hammasi');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/donors')
      .then((res) => {
        if (!res.ok) throw new Error("Server xatosi");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setDonors(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Yuklashda xato:", err);
        setLoading(false);
      });
  }, [setDonors]);

  // FILTRLASH MANTIQI (Sizning kodingiz bo'yicha)
  const filteredDonors = donors.filter(donor => {
    const name = donor.name || '';
    const city = donor.city || donor.region || '';
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          city.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Guruh bo'yicha filtr (masalan: 1-Guruh, 2-Guruh yoki aniq guruh nomi)
    const matchesGroup = selectedGroup === 'Hammasi' || 
                         donor.bloodGroup.includes(selectedGroup.split('-')[0]);

    return matchesSearch && matchesGroup;
  });

  return (
    <div className="donor-page-container anim-fade-in">
      <div className="donor-wrapper">
        
        <div className="donor-search-hero">
          <div className="search-title-row">
            <span className="search-icon-big">🔍</span>
            <h1>Donorlarni <span>Qidirish</span></h1>
          </div>
          <p className="search-subtitle">Tizimda mavjud donorlar orasidan tezkor va jonli saralash</p>
          
          <div className="search-input-wrapper">
            <input 
              type="text" 
              placeholder="Ism yoki shahar bo'yicha kiriting..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="premium-search-input"
            />
            <span className="results-counter">Natijalar: {filteredDonors.length} ta</span>
          </div>

          {/* GURUH TUGMALARI */}
          <div className="group-filter-buttons" style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap' }}>
            {['Hammasi', '1-Guruh', '2-Guruh', '3-Guruh', '4-Guruh'].map((group) => (
              <button 
                key={group}
                onClick={() => setSelectedGroup(group)}
                style={{
                  padding: '10px 20px', borderRadius: '20px', border: 'none', cursor: 'pointer',
                  background: selectedGroup === group ? '#ef4444' : 'rgba(255,255,255,0.05)',
                  color: '#fff', fontWeight: '600'
                }}
              >
                {group === 'Hammasi' ? '🌈 Hammasi' : `🩸 ${group}`}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: '#fff', marginTop: '40px' }}>Yuklanmoqda... ⏳</div>
        ) : (
          <div className="donor-grid-luxury" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '30px' }}>
            {filteredDonors.map((donor) => (
              <div key={donor._id || donor.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px' }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#fff' }}>{donor.name}</h3>
                <p style={{ color: '#94a3b8', margin: '5px 0' }}>📍 Shahar: {donor.city || donor.region}</p>
                <p style={{ color: '#ef4444', fontWeight: '700', margin: '5px 0' }}>🩸 Guruh: {donor.bloodGroup}</p>
                <p style={{ color: '#cbd5e1', margin: '5px 0' }}>📞 Telefon: {donor.phone}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}