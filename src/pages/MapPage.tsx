import React, { useState } from 'react';
import { Search, MapPin, Layers, List, Grid } from 'lucide-react';
import FoxMapComponent from '../components/ui/FoxMapComponent';
import LocationCard from '../components/ui/LocationCard';
import { mockLocations } from '../mock/foxData';

const MapPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list' | 'grid'>('map');
  
  const locationTypes = [
    { id: 'shrine', label: '神社' },
    { id: 'sanctuary', label: '聖域' },
    { id: 'statue', label: '像' },
    { id: 'museum', label: '博物館' },
    { id: 'other', label: 'その他' }
  ];

  const filteredLocations = mockLocations.filter(location => {
    const matchesSearch = searchQuery === '' || 
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === null || location.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="pt-24 pb-16 bg-cream min-h-screen">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-brown-800 mb-4">狐の聖地マップ</h1>
          <p className="text-brown-600 max-w-3xl">
            日本全国の稲荷神社や狐にまつわる観光地、聖地などを地図で探索できます。
            お気に入りの場所を見つけて訪れてみましょう。
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brown-400" />
              <input
                type="text"
                placeholder="場所を検索..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="input pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {locationTypes.map(type => (
                <button
                  key={type.id}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedType === type.id 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-brown-100 text-brown-700 hover:bg-brown-200'
                  }`}
                  onClick={() => setSelectedType(selectedType === type.id ? null : type.id)}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex justify-end">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                className={`px-3 py-1 rounded-l-md text-sm ${
                  viewMode === 'map' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-brown-100 text-brown-700 hover:bg-brown-200'
                }`}
                onClick={() => setViewMode('map')}
              >
                <Layers size={16} className="inline mr-1" />
                マップ
              </button>
              <button
                className={`px-3 py-1 text-sm ${
                  viewMode === 'list' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-brown-100 text-brown-700 hover:bg-brown-200'
                }`}
                onClick={() => setViewMode('list')}
              >
                <List size={16} className="inline mr-1" />
                リスト
              </button>
              <button
                className={`px-3 py-1 rounded-r-md text-sm ${
                  viewMode === 'grid' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-brown-100 text-brown-700 hover:bg-brown-200'
                }`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={16} className="inline mr-1" />
                グリッド
              </button>
            </div>
          </div>
        </div>

        {/* Map View */}
        {viewMode === 'map' && (
          <div className="mb-8">
            <FoxMapComponent />
          </div>
        )}

        {/* List/Grid View */}
        {viewMode !== 'map' && (
          <>
            <div className="mb-4">
              <p className="text-brown-600">
                {filteredLocations.length}件の場所が見つかりました
              </p>
            </div>
            
            {viewMode === 'list' ? (
              <div className="space-y-4">
                {filteredLocations.map(location => (
                  <div key={location.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 h-48 md:h-auto">
                        <img 
                          src={location.images[0]} 
                          alt={location.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 md:w-3/4">
                        <h3 className="font-serif font-medium text-lg text-brown-800 mb-2">{location.name}</h3>
                        
                        <div className="flex items-center mb-2 text-sm text-brown-600">
                          <MapPin size={14} className="text-orange-500 mr-1" />
                          <span>{location.address}</span>
                        </div>
                        
                        <div className="flex items-center mb-3 text-sm">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span key={i} className={i < Math.round(location.rating) ? "text-orange-400" : "text-brown-300"}>★</span>
                            ))}
                          </div>
                          <span className="ml-2 text-brown-600">({location.reviews}件のレビュー)</span>
                        </div>
                        
                        <p className="text-brown-700 text-sm mb-4">
                          {location.description}
                        </p>
                        
                        <div className="flex justify-between items-center">
                          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-md text-xs font-medium">
                            {location.type === 'shrine' ? '神社' : 
                             location.type === 'sanctuary' ? '狐の聖域' : 
                             location.type === 'statue' ? '像' : 
                             location.type === 'museum' ? '博物館' : 'その他'}
                          </span>
                          <button className="btn btn-outline text-sm">詳細を見る</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLocations.map(location => (
                  <LocationCard key={location.id} location={location} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MapPage;