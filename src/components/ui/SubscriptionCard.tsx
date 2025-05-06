import React from 'react';
import { Check, X } from 'lucide-react';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: 'month' | 'year';
  features: {
    text: string;
    included: boolean;
  }[];
  recommended?: boolean;
}

interface SubscriptionCardProps {
  plan: SubscriptionPlan;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ plan }) => {
  return (
    <div className={`card h-full flex flex-col ${plan.recommended ? 'border-2 border-orange-500 relative' : ''}`}>
      {plan.recommended && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
          おすすめ
        </div>
      )}
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-serif font-bold text-brown-800 mb-2">{plan.name}</h3>
        
        <div className="mb-6">
          <div className="flex items-end">
            <span className="text-3xl font-bold text-brown-800">¥{plan.price.toLocaleString()}</span>
            <span className="text-brown-600 ml-1">/{plan.period === 'month' ? '月' : '年'}</span>
          </div>
          {plan.period === 'year' && (
            <p className="text-sm text-orange-600 mt-1">2ヶ月分無料</p>
          )}
        </div>
        
        <ul className="space-y-3 mb-6 flex-grow">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              {feature.included ? (
                <Check size={18} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              ) : (
                <X size={18} className="text-brown-400 mt-0.5 mr-2 flex-shrink-0" />
              )}
              <span className={feature.included ? "text-brown-700" : "text-brown-400"}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
        
        <button 
          className={`btn w-full mt-auto ${plan.recommended ? 'btn-primary' : 'btn-outline'}`}
        >
          登録する
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;