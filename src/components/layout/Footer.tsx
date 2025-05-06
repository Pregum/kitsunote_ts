import React from 'react';
import { Link } from 'react-router-dom';
import { Box as Fox, Instagram, Twitter, Facebook, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brown-800 text-cream pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Fox size={24} className="text-orange-400" />
              <span className="text-xl font-serif font-bold">Kitsunote</span>
            </div>
            <p className="text-brown-100 text-sm mb-4">
              狐に関するサブカルチャー、神話・伝承、関連スポットなどの情報を
              収集・共有・保存できる、狐愛好家のための情報プラットフォーム
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-brown-200 hover:text-orange-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-brown-200 hover:text-orange-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-brown-200 hover:text-orange-400 transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-serif font-medium mb-4 text-orange-300">クイックリンク</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-brown-200 hover:text-orange-300 transition-colors">ホーム</Link></li>
              <li><Link to="/explore" className="text-brown-200 hover:text-orange-300 transition-colors">探索</Link></li>
              <li><Link to="/map" className="text-brown-200 hover:text-orange-300 transition-colors">マップ</Link></li>
              <li><Link to="/community" className="text-brown-200 hover:text-orange-300 transition-colors">コミュニティ</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-lg font-serif font-medium mb-4 text-orange-300">リソース</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-brown-200 hover:text-orange-300 transition-colors">ヘルプセンター</a></li>
              <li><a href="#" className="text-brown-200 hover:text-orange-300 transition-colors">プライバシーポリシー</a></li>
              <li><a href="#" className="text-brown-200 hover:text-orange-300 transition-colors">利用規約</a></li>
              <li><a href="#" className="text-brown-200 hover:text-orange-300 transition-colors">お問い合わせ</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="text-lg font-serif font-medium mb-4 text-orange-300">ニュースレター</h3>
            <p className="text-brown-200 text-sm mb-3">最新の狐情報を受け取りましょう</p>
            <form className="mb-4">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="メールアドレス" 
                  className="px-3 py-2 bg-brown-700 text-brown-100 rounded-l-md focus:outline-none focus:ring-1 focus:ring-orange-400 w-full"
                />
                <button 
                  type="submit" 
                  className="bg-orange-500 text-white px-3 py-2 rounded-r-md hover:bg-orange-600 transition-colors"
                >
                  登録
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-brown-700 text-center text-sm text-brown-400">
          <p>© {new Date().getFullYear()} Kitsunote. All rights reserved.</p>
          <p className="mt-2 flex items-center justify-center">
            Made with <Heart size={14} className="text-orange-500 mx-1" /> for fox enthusiasts
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;