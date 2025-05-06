import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PencilLine, TrendingUp, Clock, Filter } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import FoxCard from '../components/ui/FoxCard';
import { mockPosts } from '../mock/foxData';
import { Post } from '../types';

const CommunityPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [sortBy, setSortBy] = useState<'recent' | 'trending'>('recent');
  const [isLoading, setIsLoading] = useState(true);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTag, setNewPostTag] = useState('');
  const [newPostTags, setNewPostTags] = useState<string[]>([]);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setPosts(mockPosts);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleSortChange = (sort: 'recent' | 'trending') => {
    setIsLoading(true);
    setSortBy(sort);
    
    // Simulate sorting
    setTimeout(() => {
      let sortedPosts = [...mockPosts];
      if (sort === 'trending') {
        sortedPosts.sort((a, b) => b.likes - a.likes);
      } else {
        sortedPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
      setPosts(sortedPosts);
      setIsLoading(false);
    }, 800);
  };

  const handleAddTag = () => {
    if (newPostTag.trim() && !newPostTags.includes(newPostTag.trim())) {
      setNewPostTags([...newPostTags, newPostTag.trim()]);
      setNewPostTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setNewPostTags(newPostTags.filter(t => t !== tag));
  };

  const handleCreatePost = () => {
    if (newPostContent.trim()) {
      const newPost: Post = {
        id: `temp-${Date.now()}`,
        userId: user?.id || '1',
        username: user?.username || 'anonymous',
        userAvatar: user?.avatar || 'https://images.pexels.com/photos/1074882/pexels-photo-1074882.jpeg?auto=compress&cs=tinysrgb&w=600',
        content: newPostContent,
        images: [],
        tags: newPostTags,
        likes: 0,
        comments: 0,
        createdAt: new Date()
      };
      
      setPosts([newPost, ...posts]);
      setNewPostContent('');
      setNewPostTags([]);
      setShowCreatePost(false);
    }
  };

  return (
    <div className="pt-24 pb-16 bg-cream min-h-screen">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-brown-800 mb-4">コミュニティ</h1>
          <p className="text-brown-600 max-w-3xl">
            狐愛好家同士で情報を共有したり、体験を語り合ったりしましょう。
            素敵な発見や体験を皆で共有してください。
          </p>
        </div>

        {/* Create Post Button */}
        {isAuthenticated ? (
          <div className="mb-6">
            <button 
              className="btn btn-primary flex items-center"
              onClick={() => setShowCreatePost(!showCreatePost)}
            >
              <PencilLine size={18} className="mr-2" />
              投稿を作成
            </button>
          </div>
        ) : (
          <div className="bg-orange-50 p-4 rounded-lg mb-6">
            <p className="text-brown-700 mb-2">コミュニティに参加するにはログインが必要です</p>
            <div className="flex gap-2">
              <Link to="/login" className="btn btn-outline text-sm">ログイン</Link>
              <Link to="/signup" className="btn btn-primary text-sm">新規登録</Link>
            </div>
          </div>
        )}

        {/* Create Post Form */}
        {showCreatePost && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-6 animate-fadeIn">
            <h3 className="font-medium text-brown-800 mb-3">新しい投稿を作成</h3>
            
            <textarea
              className="input h-32 mb-3"
              placeholder="あなたの体験や発見を共有しましょう..."
              value={newPostContent}
              onChange={e => setNewPostContent(e.target.value)}
            ></textarea>
            
            {/* Tags Input */}
            <div className="mb-4">
              <label className="block text-sm text-brown-600 mb-1">タグ</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {newPostTags.map(tag => (
                  <div 
                    key={tag}
                    className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm flex items-center"
                  >
                    #{tag}
                    <button 
                      className="ml-1 focus:outline-none"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  className="input rounded-r-none"
                  placeholder="タグを追加 (Enter で追加)"
                  value={newPostTag}
                  onChange={e => setNewPostTag(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddTag()}
                />
                <button 
                  className="bg-orange-500 text-white px-3 rounded-r-md hover:bg-orange-600"
                  onClick={handleAddTag}
                >
                  追加
                </button>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <button 
                className="btn btn-outline"
                onClick={() => setShowCreatePost(false)}
              >
                キャンセル
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleCreatePost}
                disabled={!newPostContent.trim()}
              >
                投稿
              </button>
            </div>
          </div>
        )}

        {/* Sort Options */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <button
              className={`flex items-center ${
                sortBy === 'recent' 
                  ? 'text-orange-500 font-medium' 
                  : 'text-brown-600 hover:text-brown-800'
              }`}
              onClick={() => handleSortChange('recent')}
            >
              <Clock size={18} className="mr-1" />
              最新
            </button>
            <button
              className={`flex items-center ${
                sortBy === 'trending' 
                  ? 'text-orange-500 font-medium' 
                  : 'text-brown-600 hover:text-brown-800'
              }`}
              onClick={() => handleSortChange('trending')}
            >
              <TrendingUp size={18} className="mr-1" />
              人気
            </button>
          </div>
          
          <button className="text-brown-600 hover:text-brown-800 flex items-center">
            <Filter size={18} className="mr-1" />
            フィルター
          </button>
        </div>

        {/* Posts */}
        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="fox-loading"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {posts.map(post => (
              <FoxCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityPage;