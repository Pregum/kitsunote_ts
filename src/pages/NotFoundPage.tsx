import React from 'react';
import { Link } from 'react-router-dom';
import { Box as Fox, Home, Search } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen flex items-center justify-center bg-cream">
      <div className="container-custom text-center">
        <div className="max-w-lg mx-auto">
          <Fox size={80} className="text-orange-500 mx-auto mb-6" />
          
          <h1 className="text-4xl font-serif font-bold text-brown-800 mb-4">
            404 - ページが見つかりません
          </h1>
          
          <p className="text-brown-600 mb-8">
            お探しのページは存在しないか、移動した可能性があります。
            狐は時々トリックを仕掛けるものですが、私たちがお手伝いします。
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Link to="/" className="btn btn-primary flex items-center justify-center">
              <Home size={18} className="mr-2" />
              ホームに戻る
            </Link>
            
            <Link to="/explore" className="btn btn-outline flex items-center justify-center">
              <Search size={18} className="mr-2" />
              探索する
            </Link>
          </div>
          
          <div className="relative">
            <div className="h-px bg-brown-200 absolute left-0 right-0 top-1/2 transform -translate-y-1/2"></div>
            <span className="relative bg-cream px-4 text-brown-500 text-sm">または</span>
          </div>
          
          <div className="mt-8">
            <p className="text-brown-600 mb-4 text-sm">
              以下のリンクから探してみてください：
            </p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-orange-500">
              <Link to="/community" className="hover:text-orange-600">コミュニティ</Link>
              <Link to="/map" className="hover:text-orange-600">マップ</Link>
              <Link to="/explore" className="hover:text-orange-600">探索</Link>
              <Link to="/login" className="hover:text-orange-600">ログイン</Link>
              <Link to="/signup" className="hover:text-orange-600">新規登録</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;