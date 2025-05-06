import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Box as Fox } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('メールアドレスとパスワードを入力してください');
      return;
    }
    
    try {
      setError('');
      setIsLoading(true);
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('ログインに失敗しました。認証情報を確認してください。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16 bg-cream min-h-screen">
      <div className="container-custom">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="text-center mb-6">
              <Fox size={40} className="text-orange-500 mx-auto mb-2" />
              <h1 className="text-2xl font-serif font-bold text-brown-800">Kitsunoteにログイン</h1>
              <p className="text-brown-600 text-sm">アカウントにログインして、狐の世界を探索しましょう</p>
            </div>
            
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-brown-700 mb-1">
                  メールアドレス
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-brown-700 mb-1">
                  パスワード
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input pr-10"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brown-400 hover:text-brown-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="flex justify-end mt-1">
                  <a href="#" className="text-sm text-orange-500 hover:text-orange-600">
                    パスワードをお忘れですか？
                  </a>
                </div>
              </div>
              
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    ログイン中...
                  </div>
                ) : (
                  'ログイン'
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-brown-600 text-sm">
                アカウントをお持ちでない方は 
                <Link to="/signup" className="text-orange-500 hover:text-orange-600 font-medium">
                  新規登録
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;