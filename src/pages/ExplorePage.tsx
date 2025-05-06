import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import MythologyCard from '../components/ui/MythologyCard';
import MediaCard from '../components/ui/MediaCard';
import { mockMythology, mockMedia } from '../mock/foxData';

const ExplorePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mythology' | 'media'>('mythology');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const mythologyFilters = ['日本', '中国', '西洋', '平安時代', '江戸時代', '現代'];
  const mediaFilters = ['アニメ', '漫画', 'ゲーム', '書籍', '映画', 'アート'];

  const toggleFilter = (filter: string) => {
    if (filters.includes(filter)) {
      setFilters(filters.filter(f => f !== filter));
    } else {
      setFilters([...filters, filter]);
    }
  };

  const clearFilters = () => {
    setFilters([]);
    setSearchQuery('');
  };

  const getFilteredContent = () => {
    if (activeTab === 'mythology') {
      return mockMythology.filter(myth => {
        const matchesSearch = searchQuery === '' || 
          myth.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          myth.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesFilters = filters.length === 0 || 
          filters.some(filter => 
            myth.origin.includes(filter) || 
            myth.period.includes(filter)
          );
        
        return matchesSearch && matchesFilters;
      });
    } else {
      return mockMedia.filter(media => {
        const matchesSearch = searchQuery === '' || 
          media.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          media.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesFilters = filters.length === 0 || 
          filters.some(filter => {
            const mediaTypeMap: Record<string, string> = {
              'アニメ': 'anime',
              '漫画': 'manga',
              'ゲーム': 'game',
              '書籍': 'book',
              '映画': 'film',
              'アート': 'art'
            };
            
            return media.type === mediaTypeMap[filter] || 
                   media.tags.some(tag => tag.includes(filter));
          });
        
        return matchesSearch && matchesFilters;
      });
    }
  };

  const filteredContent = getFilteredContent();

  return (
    <div className="pt-24 pb-16 bg-cream min-h-screen">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-brown-800 mb-4">狐の世界を探索</h1>
          <p className="text-brown-600 max-w-3xl">
            狐にまつわる神話・伝承からアニメ、漫画、ゲームなどのサブカルチャーまで、
            様々な狐の情報を探索してみましょう。
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brown-400" />
              <input
                type="text"
                placeholder="キーワードで検索..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="input pl-10"
              />
            </div>
            <button 
              className="btn btn-outline flex items-center justify-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
              フィルター
              {filters.length > 0 && (
                <span className="bg-orange-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                  {filters.length}
                </span>
              )}
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-white p-4 rounded-lg shadow-md mb-4 animate-fadeIn">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-brown-800">フィルター</h3>
                {filters.length > 0 && (
                  <button 
                    className="text-sm text-orange-500 hover:text-orange-600"
                    onClick={clearFilters}
                  >
                    すべてクリア
                  </button>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {(activeTab === 'mythology' ? mythologyFilters : mediaFilters).map(filter => (
                  <button
                    key={filter}
                    className={`px-3 py-1 rounded-full text-sm ${
                      filters.includes(filter) 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-brown-100 text-brown-700 hover:bg-brown-200'
                    }`}
                    onClick={() => toggleFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Applied Filters */}
          {filters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {filters.map(filter => (
                <div 
                  key={filter}
                  className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {filter}
                  <button 
                    className="ml-1 focus:outline-none"
                    onClick={() => toggleFilter(filter)}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content Tabs */}
        <div className="mb-6 border-b border-brown-200">
          <div className="flex">
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'mythology'
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-brown-600 hover:text-brown-800'
              }`}
              onClick={() => setActiveTab('mythology')}
            >
              神話・伝承
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'media'
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-brown-600 hover:text-brown-800'
              }`}
              onClick={() => setActiveTab('media')}
            >
              メディア・サブカル
            </button>
          </div>
        </div>

        {/* Content Grid */}
        {filteredContent.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTab === 'mythology'
              ? filteredContent.map(myth => (
                  <MythologyCard key={myth.id} mythology={myth} />
                ))
              : filteredContent.map(media => (
                  <MediaCard key={media.id} media={media} />
                ))
            }
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-brown-600 mb-4">検索条件に一致するコンテンツがありません</p>
            <button
              onClick={clearFilters}
              className="btn btn-outline"
            >
              フィルターをクリア
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;