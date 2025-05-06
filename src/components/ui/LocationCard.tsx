import React from 'react';
import { MapPin, Star, ExternalLink } from 'lucide-react';
import { FoxLocation } from '../../types';

interface LocationCardProps {
  location: FoxLocation;
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  return (
    <div className="card flex flex-col h-full">
      {/* Image */}
      <div className="relative h-40">
        <img 
          src={location.images[0]} 
          alt={location.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-medium">
          {location.type === 'shrine' ? '神社' : 
           location.type === 'sanctuary' ? '狐の聖域' : 
           location.type === 'statue' ? '像' : 
           location.type === 'museum' ? '博物館' : 'その他'}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-serif font-medium text-lg text-brown-800 mb-2">{location.name}</h3>
        
        <div className="flex items-center mb-2 text-sm text-brown-600">
          <MapPin size={14} className="text-orange-500 mr-1" />
          <span>{location.address}</span>
        </div>
        
        <div className="flex items-center mb-3 text-sm">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                className={i < Math.round(location.rating) ? "text-orange-400 fill-orange-400" : "text-brown-300"}
              />
            ))}
          </div>
          <span className="ml-2 text-brown-600">({location.reviews}件のレビュー)</span>
        </div>
        
        <p className="text-brown-700 text-sm mb-4 flex-grow line-clamp-3">
          {location.description}
        </p>
        
        <div className="mt-auto flex justify-between">
          <button className="btn btn-outline text-sm">詳細を見る</button>
          
          {location.website && (
            <a 
              href={location.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-600 flex items-center"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationCard;