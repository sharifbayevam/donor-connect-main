import React from 'react';

export default function BloodGroupCard({ group, count, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className="bg-white border border-gray-200 hover:border-red-500 p-3 rounded-xl flex flex-col items-center justify-center transition active:scale-95"
    >
      <span className="text-xl font-bold text-gray-800">{group}</span>
      <span className="text-[10px] text-gray-400 mt-0.5">{count} donor</span>
    </button>
  );
}