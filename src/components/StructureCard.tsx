import React from 'react';

interface StructureCardProps {
  title: string;
  name: string;
  className?: string;
}

const StructureCard: React.FC<StructureCardProps> = ({ title, name, className = '' }) => {
  return (
    <div className={`bg-white text-black p-4 rounded-lg shadow-md text-center ${className}`}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm">{name}</p>
    </div>
  );
};

export default StructureCard;
