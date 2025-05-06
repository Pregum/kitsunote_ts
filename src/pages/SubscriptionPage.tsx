import React from 'react';
import { Check, Info } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SubscriptionCard from '../components/ui/SubscriptionCard';
import { subscriptionPlans } from '../mock/foxData';

const SubscriptionPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="pt-24 pb-16 bg-cream min-h-screen">
      <div className="container-custom">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h1 className="text-3xl font-serif font-bold text-brown-800 mb-4">サブスクリプションプラン</h1>
          <p className="text-brown-600">
            Kitsunoteのプレミアム機能を利用して、より充実した狐の世界の探索体験をお楽しみください。
            広告のない快適な閲覧環境や、限定コンテンツへのアクセスが可能になります。
          </p>
        </div>

        {user?.isPremium && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 max-w-3xl mx-auto flex items-start">
            <div className="bg-green-100 rounded-full p-2 mr-3 flex-shrink-0">
              <Check size={18} className="text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-green-800 mb-1">プレミアムメンバーシップ有効</h3>
              <p className="text-green-700 text-sm">
                現在プレミアムプランをご利用中です。すべての特典と機能をお楽しみいただけます。
                次回の請求日は2025年6月15日です。
              </p>
            </div>
          </div>
        )}

        {/* Info Banner */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8 max-w-3xl mx-auto flex items-start">
          <div className="bg-orange-100 rounded-full p-2 mr-3 flex-shrink-0">
            <Info size={18} className="text-orange-600" />
          </div>
          <div>
            <h3 className="font-medium text-orange-800 mb-1">デモサイトのお知らせ</h3>
            <p className="text-orange-700 text-sm">
              これはデモサイトです。実際の支払い処理は行われません。「登録する」ボタンをクリックすると、
              デモアカウントがプレミアムステータスに更新されます。
            </p>
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subscriptionPlans.map(plan => (
            <SubscriptionCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Features Comparison */}
        <div className="mt-16">
          <h2 className="text-2xl font-serif font-bold text-brown-800 mb-6 text-center">
            プラン比較
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-brown-50">
                  <th className="p-4 text-left text-brown-800 border-b border-brown-200 w-1/3">機能</th>
                  <th className="p-4 text-center text-brown-800 border-b border-brown-200">無料プラン</th>
                  <th className="p-4 text-center text-orange-600 border-b border-brown-200">
                    <span className="relative">
                      プレミアム
                      <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                        おすすめ
                      </span>
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 border-b border-brown-100 text-brown-700">基本的な投稿・閲覧機能</td>
                  <td className="p-4 border-b border-brown-100 text-center">
                    <Check size={18} className="text-green-500 mx-auto" />
                  </td>
                  <td className="p-4 border-b border-brown-100 text-center">
                    <Check size={18} className="text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-brown-100 text-brown-700">広告表示</td>
                  <td className="p-4 border-b border-brown-100 text-center">
                    あり
                  </td>
                  <td className="p-4 border-b border-brown-100 text-center text-green-600 font-medium">
                    なし
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-brown-100 text-brown-700">お気に入り保存</td>
                  <td className="p-4 border-b border-brown-100 text-center">
                    最大10件
                  </td>
                  <td className="p-4 border-b border-brown-100 text-center text-green-600 font-medium">
                    無制限
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-brown-100 text-brown-700">限定コンテンツへのアクセス</td>
                  <td className="p-4 border-b border-brown-100 text-center text-brown-400">
                    ✕
                  </td>
                  <td className="p-4 border-b border-brown-100 text-center">
                    <Check size={18} className="text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-brown-100 text-brown-700">パーソナルコレクション作成</td>
                  <td className="p-4 border-b border-brown-100 text-center text-brown-400">
                    ✕
                  </td>
                  <td className="p-4 border-b border-brown-100 text-center">
                    <Check size={18} className="text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-brown-100 text-brown-700">プレミアムデザインテーマ</td>
                  <td className="p-4 border-b border-brown-100 text-center text-brown-400">
                    ✕
                  </td>
                  <td className="p-4 border-b border-brown-100 text-center">
                    <Check size={18} className="text-green-500 mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-serif font-bold text-brown-800 mb-6 text-center">
            よくある質問
          </h2>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <details className="group">
                <summary className="p-4 flex justify-between items-center cursor-pointer">
                  <h3 className="font-medium text-brown-800">プレミアムプランにはどのような特典がありますか？</h3>
                  <span className="transform group-open:rotate-180 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brown-500">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </summary>
                <div className="p-4 pt-0 text-brown-600">
                  プレミアムプランでは、広告のない閲覧体験、無制限のお気に入り保存、限定コンテンツへのアクセス、パーソナルコレクション機能、プレミアムデザインテーマなどの特典をお楽しみいただけます。
                </div>
              </details>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <details className="group">
                <summary className="p-4 flex justify-between items-center cursor-pointer">
                  <h3 className="font-medium text-brown-800">いつでもキャンセルできますか？</h3>
                  <span className="transform group-open:rotate-180 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brown-500">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </summary>
                <div className="p-4 pt-0 text-brown-600">
                  はい、いつでもキャンセルできます。キャンセル後も、課金期間の終了までプレミアム機能をご利用いただけます。
                </div>
              </details>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <details className="group">
                <summary className="p-4 flex justify-between items-center cursor-pointer">
                  <h3 className="font-medium text-brown-800">年間プランと月間プランの違いは何ですか？</h3>
                  <span className="transform group-open:rotate-180 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brown-500">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </summary>
                <div className="p-4 pt-0 text-brown-600">
                  年間プランは月間プランと同じ特典を提供しますが、一括払いで2ヶ月分無料になるお得なプランです。長期的にご利用予定の方には年間プランがおすすめです。
                </div>
              </details>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <details className="group">
                <summary className="p-4 flex justify-between items-center cursor-pointer">
                  <h3 className="font-medium text-brown-800">支払い方法は何がありますか？</h3>
                  <span className="transform group-open:rotate-180 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brown-500">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </summary>
                <div className="p-4 pt-0 text-brown-600">
                  クレジットカード（Visa、Mastercard、American Express）、PayPal、Apple Pay、Google Payに対応しています。
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;