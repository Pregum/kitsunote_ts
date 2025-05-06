import React, { useState } from 'react';
import { MapPin, Info } from 'lucide-react';
import { FoxLocation } from '../../types';

// Mock data for map locations
const mockLocations: FoxLocation[] = [
  {
    id: '1',
    name: '伏見稲荷大社',
    description: '京都で最も有名な狐の聖地。何千もの朱色の鳥居が連なる千本鳥居が特徴的。',
    type: 'shrine',
    address: '京都府京都市伏見区深草藪之内町68',
    lat: 34.9671,
    lng: 135.7727,
    images: ['https://images.pexels.com/photos/5169470/pexels-photo-5169470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
    rating: 4.8,
    reviews: 1250,
    website: 'http://inari.jp/'
  },
  {
    id: '2',
    name: '豊川稲荷',
    description: '関東の伏見稲荷とも呼ばれる人気の稲荷神社。商売繁盛の神として知られる。',
    type: 'shrine',
    address: '愛知県豊川市豊川町1番地',
    lat: 34.8260,
    lng: 137.3764,
    images: ['https://images.pexels.com/photos/6538023/pexels-photo-6538023.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
    rating: 4.5,
    reviews: 870,
    website: 'https://toyokawainari.jp/'
  },
  {
    id: '3',
    name: '宮城蔵王キツネ村',
    description: '約100匹のキツネと触れ合える珍しい動物園。キツネたちと近い距離で写真撮影も可能。',
    type: 'sanctuary',
    address: '宮城県白石市福岡八宮字白菅11-3',
    lat: 38.1355,
    lng: 140.6682,
    images: ['https://images.pexels.com/photos/4588019/pexels-photo-4588019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
    rating: 4.3,
    reviews: 520,
    website: 'http://zao-fox-village.com/'
  }
];

const FoxMapComponent: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<FoxLocation | null>(null);

  // In a real implementation, we would use a map library like Leaflet or Google Maps
  return (
    <div className="relative w-full bg-brown-50 rounded-lg overflow-hidden">
      {/* This is a placeholder for the actual map */}
      <div className="h-[400px] bg-brown-100 flex items-center justify-center">
        <div className="text-center text-brown-500">
          <Info size={40} className="mx-auto mb-2" />
          <p className="font-medium">地図はデモ用のプレースホルダーです</p>
          <p className="text-sm mt-1">実際の実装ではGoogle MapsまたはLeafletを使用します</p>
        </div>
        
        {/* Mock pins */}
        {mockLocations.map(location => (
          <div 
            key={location.id}
            className="absolute cursor-pointer group"
            style={{ 
              left: `${Math.random() * 70 + 15}%`, 
              top: `${Math.random() * 70 + 15}%` 
            }}
            onClick={() => setSelectedLocation(location)}
          >
            <div className="relative">
              <MapPin 
                size={30} 
                className="text-orange-500 fill-orange-500 hover:text-orange-600 hover:fill-orange-600 transition-colors" 
              />
              <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white p-2 rounded shadow-md text-sm whitespace-nowrap transition-opacity">
                {location.name}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Location detail */}
      {selectedLocation && (
        <div className="absolute bottom-0 left-0 right-0 bg-white p-4 shadow-md">
          <div className="flex">
            <img 
              src={selectedLocation.images[0]} 
              alt={selectedLocation.name} 
              className="w-20 h-20 object-cover rounded-md mr-4"
            />
            <div>
              <h3 className="font-serif font-medium text-brown-800">{selectedLocation.name}</h3>
              <p className="text-sm text-brown-600 mb-1">{selectedLocation.address}</p>
              <div className="flex items-center text-sm">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < Math.round(selectedLocation.rating) ? "text-orange-400" : "text-brown-300"}>★</span>
                  ))}
                </div>
                <span className="ml-1 text-brown-600">({selectedLocation.reviews})</span>
              </div>
            </div>
            <button 
              className="btn btn-outline text-sm ml-auto self-center"
              onClick={() => window.open(selectedLocation.website, '_blank')}
            >
              訪問する
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoxMapComponent;