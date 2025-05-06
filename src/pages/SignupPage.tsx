import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Box as Fox, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const validatePassword = () => {
    return password.length >= 8;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !username || !password) {
      setError('すべての項目を入力してください');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('パスワードが一致しません');
      return;
    }
    
    if (!validatePassword()) {
      setError('パスワードは8文字以上である必要があります');
      return;
    }
    
    if (!agreeTerms) {
      setError('利用規約とプライバシーポリシーに同意する必要があります');
      return;
    }
    
    try {
      setError('');
      setIsLoading(true);
      await signup(email, password, username);
      navigate('/');
    } catch (err) {
      setError('アカウント作成に失敗しました。別のメールアドレスまたはユーザー名をお試しください。');
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
              <h1 className="text-2xl font-serif font-bold text-brown-800">Kitsunoteに登録</h1>
              <p className="text-brown-600 text-sm">アカウントを作成して、狐の世界を探索しましょう</p>
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
              
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-brown-700 mb-1">
                  ユーザーネーム
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input"
                  placeholder="kitsune_lover"
                  required
                />
              </div>
              
              <div className="mb-4">
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
                <p className={`text-xs mt-1 ${validatePassword() ? 'text-green-600' : 'text-brown-500'}`}>
                  パスワードは8文字以上である必要があります
                </p>
              </div>
              
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-brown-700 mb-1">
                  パスワードの確認
                </label>
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`input ${
                    confirmPassword && password !== confirmPassword 
                      ? 'border-red-500 focus:ring-red-500' 
                      : ''
                  }`}
                  placeholder="••••••••"
                  required
                />
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">パスワードが一致しません</p>
                )}
              </div>
              
              <div className="mb-6">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-1"
                  />
                  <span className="ml-2 text-sm text-brown-600">
                    <span>Kitsunoteの</span>
                    <a href="#" className="text-orange-500 hover:text-orange-600">利用規約</a>
                    <span>および</span>
                    <a href="#" className="text-orange-500 hover:text-orange-600">プライバシーポリシー</a>
                    <span>に同意します</span>
                  </span>
                </label>
              </div>
              
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    登録中...
                  </div>
                ) : (
                  'アカウント作成'
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-brown-600 text-sm">
                すでにアカウントをお持ちの方は 
                <Link to="/login" className="text-orange-500 hover:text-orange-600 font-medium">
                  ログイン
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;