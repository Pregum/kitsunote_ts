import React from 'react';
import { useParams } from 'react-router-dom';
import { Edit, MapPin, Calendar, Users, Settings, BookOpen } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import FoxCard from '../components/ui/FoxCard';
import { mockPosts } from '../mock/foxData';
import { User } from '../types';

const ProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { user: currentUser, isAuthenticated } = useAuth();
  
  // Check if this is the current user's profile
  const isCurrentUser = currentUser?.username === username;
  
  // In a real app, fetch user data based on username
  // For now, use mock data
  const profileUser: User = {
    id: '1',
    username: username || 'kitsune_lover',
    displayName: username || 'Kitsune Fan',
    email: 'user@example.com',
    avatar: 'https://images.pexels.com/photos/1074882/pexels-photo-1074882.jpeg?auto=compress&cs=tinysrgb&w=600',
    bio: '京都在住の狐愛好家。稲荷神社巡りが趣味で、これまでに全国100以上の神社を訪れました。狐に関する神話や伝説の研究もしています。',
    joinDate: new Date('2023-05-12'),
    isPremium: true,
    savedPosts: ['1', '2', '3'],
    following: ['2', '3'],
    followers: ['2', '4', '5']
  };

  const userPosts = mockPosts.filter(post => post.username === username);

  return (
    <div className="pt-24 pb-16 bg-cream min-h-screen">
      <div className="container-custom">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-orange-400 to-orange-600"></div>
          
          {/* Profile Info */}
          <div className="relative px-6 pb-6">
            {/* Avatar */}
            <div className="absolute -top-16 left-6 border-4 border-white rounded-full overflow-hidden">
              <img 
                src={profileUser.avatar} 
                alt={profileUser.displayName}
                className="w-32 h-32 object-cover"
              />
              {profileUser.isPremium && (
                <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                  Premium
                </div>
              )}
            </div>
            
            {/* Actions */}
            <div className="flex justify-end pt-4 mb-16">
              {isCurrentUser ? (
                <button className="btn btn-outline flex items-center">
                  <Edit size={16} className="mr-1" />
                  プロフィールを編集
                </button>
              ) : (
                <button className="btn btn-primary">
                  フォローする
                </button>
              )}
            </div>
            
            {/* User Info */}
            <div>
              <h1 className="text-2xl font-serif font-bold text-brown-800 mb-1">
                {profileUser.displayName}
              </h1>
              <p className="text-brown-500 mb-3">@{profileUser.username}</p>
              
              <p className="text-brown-700 mb-4 max-w-2xl">
                {profileUser.bio}
              </p>
              
              <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-brown-600 mb-4">
                <div className="flex items-center">
                  <MapPin size={16} className="text-orange-500 mr-1" />
                  京都, 日本
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="text-orange-500 mr-1" />
                  {profileUser.joinDate.toLocaleDateString('ja-JP', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}に参加
                </div>
                <div className="flex items-center">
                  <Users size={16} className="text-orange-500 mr-1" />
                  <span className="font-medium">{profileUser.following.length}</span>フォロー中・
                  <span className="font-medium">{profileUser.followers.length}</span>フォロワー
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs and Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-4 border-b border-brown-100">
                <h3 className="font-medium text-brown-800">ハイライト</h3>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  <li className="flex items-center text-brown-700">
                    <BookOpen size={16} className="text-orange-500 mr-2" />
                    <span>{userPosts.length}件の投稿</span>
                  </li>
                  <li className="flex items-center text-brown-700">
                    <MapPin size={16} className="text-orange-500 mr-2" />
                    <span>訪問した狐スポット: 24</span>
                  </li>
                  {profileUser.isPremium && (
                    <li className="flex items-center text-orange-500 font-medium">
                      <span className="mr-2">⭐</span>
                      <span>プレミアムメンバー</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {isCurrentUser && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b border-brown-100">
                  <h3 className="font-medium text-brown-800">マイコレクション</h3>
                </div>
                <div className="p-4">
                  <p className="text-brown-600 text-sm mb-4">
                    あなた専用のコレクションを作成して、お気に入りのコンテンツを整理しましょう。
                  </p>
                  <button className="btn btn-outline w-full">
                    コレクションを見る
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Main Content */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="border-b border-brown-100">
                <nav className="flex">
                  <button className="px-4 py-3 font-medium text-orange-500 border-b-2 border-orange-500">
                    投稿
                  </button>
                  <button className="px-4 py-3 font-medium text-brown-600 hover:text-brown-800">
                    お気に入り
                  </button>
                  <button className="px-4 py-3 font-medium text-brown-600 hover:text-brown-800">
                    写真
                  </button>
                </nav>
              </div>
            </div>
            
            {/* User Posts */}
            {userPosts.length > 0 ? (
              <div className="space-y-6">
                {userPosts.map(post => (
                  <FoxCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-brown-600 mb-4">まだ投稿がありません</p>
                {isCurrentUser && (
                  <button className="btn btn-primary">
                    最初の投稿を作成
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;