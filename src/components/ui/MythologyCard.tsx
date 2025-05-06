import React from 'react';
import { BookOpen, Globe } from 'lucide-react';
import { FoxMythology } from '../../types';

interface MythologyCardProps {
  mythology: FoxMythology;
}

const MythologyCard: React.FC<MythologyCardProps> = ({ mythology }) => {
  return (
    <div className="card overflow-hidden h-full flex flex-col">
      {/* Image */}
      {mythology.images.length > 0 && (
        <div className="h-48 overflow-hidden">
          <img 
            src={mythology.images[0]} 
            alt={mythology.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-serif font-bold text-lg text-brown-800">{mythology.title}</h3>
          <span className="bg-brown-100 text-brown-700 px-2 py-1 rounded-md text-xs font-medium">
            {mythology.period}
          </span>
        </div>

        <div className="flex items-center mb-3 text-sm text-brown-600">
          <Globe size={14} className="text-orange-500 mr-1" />
          <span>{mythology.origin}</span>
        </div>

        <p className="text-brown-700 text-sm mb-4 flex-grow line-clamp-4">
          {mythology.description}
        </p>

        <div className="mt-auto pt-3 border-t border-brown-100 flex justify-between items-center">
          <div className="flex items-center text-brown-600 text-sm">
            <BookOpen size={16} className="mr-1 text-orange-500" />
            <span>{mythology.sources.length}の出典</span>
          </div>
          <button className="btn btn-outline text-sm">詳細を読む</button>
        </div>
      </div>
    </div>
  );
};

export default MythologyCard;