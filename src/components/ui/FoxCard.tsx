import React from 'react';
import { Heart, MessageSquare, MapPin, Bookmark, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Post } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface FoxCardProps {
  post: Post;
  showActions?: boolean;
}

const FoxCard: React.FC<FoxCardProps> = ({ post, showActions = true }) => {
  const { isAuthenticated } = useAuth();
  // const formattedDate = post.createdAt && typeof post.createdAt === 'object' && 'toDate' in post.createdAt
  //   ? post.createdAt.toDate().toLocaleDateString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric' })
  //   : post.createdAt instanceof Date
  //     ? post.createdAt.toLocaleDateString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric' })
  //     : '';

  return (
    <div className="card hover:translate-y-[-5px]">
      {/* Card Header */}
      <div className="p-4 flex items-center justify-between">
        <Link to={`/profile/${post.avatar}`} className="flex items-center gap-3">
          <img 
            src={post.avatar} 
            alt={post.displayName}
            className="w-10 h-10 rounded-full object-cover border-2 border-orange-200"
          />
          <div>
            <h3 className="font-medium text-brown-800">{post.displayName}</h3>
            <p className="text-xs text-brown-500">{post.username}</p>
          </div>
        </Link>

        {post.location && (
          <div className="flex items-center text-xs text-brown-600 gap-1">
            <MapPin size={14} className="text-orange-500" />
            <span>{post.location.name}</span>
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-brown-700 mb-3">{post.content}</p>
        
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map(tag => (
              <span key={tag} className="fox-tag">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Images */}
      {post.images.length > 0 && (
        <div className={`${post.images.length === 1 ? '' : 'grid grid-cols-2 gap-1'} mb-2`}>
          {post.images.map((image, index) => (
            <img 
              key={index}
              src={image} 
              alt={`${post.username}'s post`}
              className={`w-full h-60 object-cover ${post.images.length === 1 ? '' : 'h-40'}`}
            />
          ))}
        </div>
      )}

      {/* Actions */}
      {showActions && (
        <div className="px-4 py-3 border-t border-brown-100 flex justify-between">
          <div className="flex space-x-4">
            <button className="flex items-center gap-1 text-brown-600 hover:text-orange-500">
              <Heart size={18} className="text-orange-500" />
              <span className="text-sm">{post.likes}</span>
            </button>
            <button className="flex items-center gap-1 text-brown-600 hover:text-orange-500">
              <MessageSquare size={18} />
              <span className="text-sm">{post.comments}</span>
            </button>
          </div>
          <div className="flex space-x-4">
            <button 
              className="text-brown-600 hover:text-orange-500"
              disabled={!isAuthenticated}
              title={!isAuthenticated ? "ログインしてお気に入りに追加" : "お気に入りに追加"}
            >
              <Bookmark size={18} />
            </button>
            <button 
              className="text-brown-600 hover:text-orange-500"
              title="共有"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoxCard;