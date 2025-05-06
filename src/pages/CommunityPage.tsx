import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, X, Image as ImageIcon, Database } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Post } from '../types/firestore';
import { collection, addDoc, serverTimestamp, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const CommunityPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTags, setNewPostTags] = useState<string[]>([]);
  const [newPostImages, setNewPostImages] = useState<string[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const postsRef = collection(db, 'posts');
      const q = query(postsRef, orderBy('createdAt', 'desc'), limit(20));
      const querySnapshot = await getDocs(q);
      
      const fetchedPosts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Post[];
      
      setPosts(fetchedPosts);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('投稿の取得に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  const createMockData = async () => {
    if (!isAuthenticated || !user) {
      setError('モックデータを作成するにはログインが必要です');
      return;
    }

    try {
      setIsLoading(true);
      const mockPosts: Omit<Post, 'id'>[] = [
        {
          title: '稲荷神社巡りの旅',
          content: '先週末、京都の伏見稲荷大社に行ってきました。千本鳥居の美しさに感動！\n\n特に朝早く訪れると、観光客も少なく、神秘的な雰囲気を味わえます。おすすめの時間帯は朝7時頃です。',
          authorId: user.id,
          authorName: user.displayName,
          authorAvatar: user.avatar,
          images: [
            'https://images.pexels.com/photos/5169470/pexels-photo-5169470.jpeg?auto=compress&cs=tinysrgb&w=1500',
            'https://images.pexels.com/photos/5169471/pexels-photo-5169471.jpeg?auto=compress&cs=tinysrgb&w=1500'
          ],
          likes: 15,
          comments: 3,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          tags: ['稲荷神社', '京都', '観光']
        },
        {
          title: '狐の伝説について',
          content: '日本各地に伝わる狐の伝説について調べています。\n\n特に興味深いのは、東北地方に伝わる「狐の嫁入り」の伝説です。雨が降っているのに晴れている現象を「狐の嫁入り」と呼ぶのは、狐が嫁入り行列を組んで移動しているからだという説があります。',
          authorId: user.id,
          authorName: user.displayName,
          authorAvatar: user.avatar,
          images: [],
          likes: 8,
          comments: 2,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          tags: ['伝説', '民俗学', '狐の嫁入り']
        },
        {
          title: '狐のイラスト作品',
          content: '最近描いた狐のイラストを共有します。\n\n和風のデザインで、稲荷神社をモチーフにした作品です。',
          authorId: user.id,
          authorName: user.displayName,
          authorAvatar: user.avatar,
          images: [
            'https://images.pexels.com/photos/5169472/pexels-photo-5169472.jpeg?auto=compress&cs=tinysrgb&w=1500'
          ],
          likes: 12,
          comments: 4,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          tags: ['イラスト', 'アート', '創作']
        }
      ];

      for (const post of mockPosts) {
        await addDoc(collection(db, 'posts'), post);
      }

      await fetchPosts();
      setError(null);
    } catch (err) {
      console.error('Error creating mock data:', err);
      setError('モックデータの作成に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!isAuthenticated || !user) {
      setError('投稿するにはログインが必要です');
      return;
    }

    if (newPostContent.trim()) {
      try {
        const newPost: Omit<Post, 'id'> = {
          title: newPostContent.slice(0, 100), // タイトルは本文の最初の100文字
          content: newPostContent,
          authorId: user.id,
          authorName: user.displayName,
          authorAvatar: user.avatar,
          images: newPostImages,
          likes: 0,
          comments: 0,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          tags: newPostTags
        };

        const docRef = await addDoc(collection(db, 'posts'), newPost);
        
        // 新しい投稿をローカルの状態に追加
        setPosts(prev => [{
          ...newPost,
          id: docRef.id,
          createdAt: new Date(),
          updatedAt: new Date()
        }, ...prev]);

        // フォームをリセット
        setNewPostContent('');
        setNewPostTags([]);
        setNewPostImages([]);
        setShowCreatePost(false);
        setError(null);
      } catch (err) {
        console.error('Error creating post:', err);
        setError('投稿の作成に失敗しました');
      }
    }
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      if (!newPostTags.includes(newTag)) {
        setNewPostTags([...newPostTags, newTag]);
      }
      e.currentTarget.value = '';
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewPostTags(newPostTags.filter(tag => tag !== tagToRemove));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: 画像アップロード機能の実装
    console.log('Image upload:', e.target.files);
  };

  return (
    <div className="container-custom py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-brown-800">コミュニティ</h1>
        <div className="flex gap-4">
          {process.env.NODE_ENV === 'development' && (
            <button
              onClick={createMockData}
              className="btn btn-outline flex items-center gap-2"
              title="デバッグ用：モックデータを作成"
            >
              <Database size={20} />
              モックデータ作成
            </button>
          )}
          {isAuthenticated && (
            <button
              onClick={() => setShowCreatePost(true)}
              className="btn btn-primary flex items-center gap-2"
            >
              <Plus size={20} />
              新規投稿
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {showCreatePost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">新規投稿</h2>
              <button
                onClick={() => setShowCreatePost(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="投稿内容を入力してください..."
              className="w-full h-32 p-2 border rounded-lg mb-4"
            />

            <div className="mb-4">
              <input
                type="text"
                placeholder="タグを入力してEnterキーを押してください"
                onKeyDown={handleTagInput}
                className="w-full p-2 border rounded-lg"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {newPostTags.map(tag => (
                  <span
                    key={tag}
                    className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="text-orange-600 hover:text-orange-800"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="btn btn-outline flex items-center gap-2 cursor-pointer">
                <ImageIcon size={20} />
                画像を追加
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowCreatePost(false)}
                className="btn btn-outline"
              >
                キャンセル
              </button>
              <button
                onClick={handleCreatePost}
                className="btn btn-primary"
                disabled={!newPostContent.trim()}
              >
                投稿する
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-16">
          <div className="fox-loading"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="card p-6">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={post.authorAvatar}
                  alt={post.authorName}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <Link
                    to={`/profile/${post.authorId}`}
                    className="font-medium text-brown-800 hover:text-orange-600"
                  >
                    {post.authorName}
                  </Link>
                  <p className="text-sm text-gray-500">
                    {post.createdAt instanceof Date
                      ? post.createdAt.toLocaleDateString('ja-JP')
                      : new Date(post.createdAt.seconds * 1000).toLocaleDateString('ja-JP')}
                  </p>
                </div>
              </div>

              <p className="text-brown-700 mb-4 whitespace-pre-wrap">{post.content}</p>

              {post.images && post.images.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {post.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`投稿画像 ${index + 1}`}
                      className="rounded-lg w-full h-48 object-cover"
                    />
                  ))}
                </div>
              )}

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-6 text-gray-500">
                <button className="flex items-center gap-2 hover:text-orange-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  {post.likes}
                </button>
                <button className="flex items-center gap-2 hover:text-orange-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  {post.comments}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityPage;