import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, BookOpen, Users, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import FoxCard from '../components/ui/FoxCard';
import LocationCard from '../components/ui/LocationCard';
import MythologyCard from '../components/ui/MythologyCard';
import { mockPosts, mockLocations, mockMythology, mockMedia } from '../mock/foxData';

const HomePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [recentPosts, setRecentPosts] = useState(mockPosts);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-brown-900 text-white overflow-hidden">
        <div 
          className="absolute inset-0 z-0 opacity-30 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/5169470/pexels-photo-5169470.jpeg?auto=compress&cs=tinysrgb&w=1500')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brown-900 via-brown-900/80 to-transparent z-10"></div>
        
        <div className="container-custom relative z-20 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
              <span className="text-orange-400">Kitsunote</span> で狐の世界を探索しよう
            </h1>
            <p className="text-lg md:text-xl mb-8 text-brown-100">
              狐に関するサブカルチャー、神話・伝承、関連スポットなどの情報を
              収集・共有・保存できる、狐愛好家のための情報プラットフォーム
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/explore" className="btn btn-primary flex-grow sm:flex-grow-0">
                探索を始める
              </Link>
              {!isAuthenticated && (
                <Link to="/signup" className="btn btn-outline border-white text-white hover:bg-white/10 flex-grow sm:flex-grow-0">
                  アカウント作成
                </Link>
              )}
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cream to-transparent z-20"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-cream">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-brown-800 mb-4">Kitsunoteの主な機能</h2>
            <p className="text-brown-600 max-w-2xl mx-auto">
              狐に関するあらゆる情報を探索し、共有し、保存することができます
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6 text-center hover:translate-y-[-5px]">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={30} className="text-orange-500" />
              </div>
              <h3 className="text-xl font-serif font-medium text-brown-800 mb-2">狐関連スポット</h3>
              <p className="text-brown-600 mb-4">
                日本全国の稲荷神社や狐にまつわる観光地、聖地などを地図とともに紹介
              </p>
              <Link to="/map" className="text-orange-500 hover:text-orange-600 inline-flex items-center">
                マップを見る <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="card p-6 text-center hover:translate-y-[-5px]">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen size={30} className="text-orange-500" />
              </div>
              <h3 className="text-xl font-serif font-medium text-brown-800 mb-2">狐の神話と伝承</h3>
              <p className="text-brown-600 mb-4">
                日本や世界各国に伝わる狐にまつわる神話、伝説、民話などの情報を網羅
              </p>
              <Link to="/explore" className="text-orange-500 hover:text-orange-600 inline-flex items-center">
                神話を学ぶ <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="card p-6 text-center hover:translate-y-[-5px]">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={30} className="text-orange-500" />
              </div>
              <h3 className="text-xl font-serif font-medium text-brown-800 mb-2">コミュニティ</h3>
              <p className="text-brown-600 mb-4">
                狐愛好家同士で情報交換したり、体験を共有したりできるSNS機能
              </p>
              <Link to="/community" className="text-orange-500 hover:text-orange-600 inline-flex items-center">
                参加する <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 bg-orange-50">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-serif font-bold text-brown-800">最近の投稿</h2>
            <Link to="/community" className="text-orange-500 hover:text-orange-600 flex items-center">
              すべて見る <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-16">
              <div className="fox-loading"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {recentPosts.slice(0, 4).map(post => (
                <FoxCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Locations */}
      <section className="py-16 bg-cream">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-serif font-bold text-brown-800">おすすめの狐スポット</h2>
            <Link to="/map" className="text-orange-500 hover:text-orange-600 flex items-center">
              すべて見る <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockLocations.slice(0, 3).map(location => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Mythology */}
      <section className="py-16 bg-orange-50">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-serif font-bold text-brown-800">狐の神話と伝承</h2>
            <Link to="/explore" className="text-orange-500 hover:text-orange-600 flex items-center">
              すべて見る <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockMythology.map(myth => (
              <MythologyCard key={myth.id} mythology={myth} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brown-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Kitsunoteコミュニティに参加しよう</h2>
          <p className="text-brown-100 max-w-2xl mx-auto mb-8">
            アカウントを作成して、狐愛好家のためのコミュニティに参加しましょう。
            情報の共有、コレクションの作成、他のメンバーとの交流ができます。
          </p>
          
          {isAuthenticated ? (
            <Link to="/community" className="btn btn-primary">
              コミュニティを見る
            </Link>
          ) : (
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup" className="btn btn-primary">
                無料アカウントを作成
              </Link>
              <Link to="/login" className="btn btn-outline border-white text-white hover:bg-white/10">
                ログイン
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;