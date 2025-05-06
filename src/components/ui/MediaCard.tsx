import React from 'react';
import { Calendar, Tag } from 'lucide-react';
import { FoxMedia } from '../../types';

interface MediaCardProps {
  media: FoxMedia;
}

const MediaCard: React.FC<MediaCardProps> = ({ media }) => {
  const getMediaTypeLabel = (type: string): string => {
    switch (type) {
      case 'anime': return 'アニメ';
      case 'manga': return '漫画';
      case 'game': return 'ゲーム';
      case 'book': return '書籍';
      case 'film': return '映画';
      case 'art': return 'アート';
      default: return type;
    }
  };

  return (
    <div className="card overflow-hidden h-full flex flex-col">
      {/* Image */}
      {media.images.length > 0 && (
        <div className="relative h-56 overflow-hidden">
          <img 
            src={media.images[0]} 
            alt={media.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-medium">
            {getMediaTypeLabel(media.type)}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-serif font-bold text-lg text-brown-800 mb-2">{media.title}</h3>
        
        <div className="flex items-center mb-2 text-sm text-brown-600">
          <span className="font-medium mr-2">作者:</span>
          <span>{media.creator}</span>
        </div>
        
        <div className="flex items-center mb-3 text-sm text-brown-600">
          <Calendar size={14} className="text-orange-500 mr-1" />
          <span>{media.year}年</span>
        </div>
        
        {media.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {media.tags.slice(0, 3).map(tag => (
              <span key={tag} className="fox-tag flex items-center">
                <Tag size={12} className="mr-1" />
                {tag}
              </span>
            ))}
            {media.tags.length > 3 && (
              <span className="fox-tag bg-brown-100 text-brown-700">
                +{media.tags.length - 3}
              </span>
            )}
          </div>
        )}
        
        <p className="text-brown-700 text-sm mb-4 flex-grow line-clamp-3">
          {media.description}
        </p>
        
        <div className="mt-auto">
          <button className="btn btn-primary w-full text-sm">詳細を見る</button>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;