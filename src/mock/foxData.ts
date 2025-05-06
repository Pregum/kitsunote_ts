import { Post, FoxLocation, FoxMythology, FoxMedia } from '../types';

// Mock Posts
export const mockPosts: Post[] = [
  {
    id: '1',
    userId: '1',
    username: 'kitsune_lover',
    userAvatar: 'https://images.pexels.com/photos/1074882/pexels-photo-1074882.jpeg?auto=compress&cs=tinysrgb&w=600',
    content: '今日は伏見稲荷大社に行ってきました！千本鳥居は何度見ても神秘的です✨ 狐の彫刻もたくさん見つけました🦊',
    images: [
      'https://images.pexels.com/photos/5169470/pexels-photo-5169470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    tags: ['伏見稲荷', '京都', '狐像'],
    location: {
      name: '伏見稲荷大社',
      lat: 34.9671,
      lng: 135.7727
    },
    likes: 124,
    comments: 18,
    createdAt: new Date('2023-05-10')
  },
  {
    id: '2',
    userId: '2',
    username: 'fox_mythology',
    userAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    content: '狐の神様「稲荷神」について調べています。商売繁盛の神様として知られていますが、もともとは農業の神様だったんですよ。皆さんは稲荷神社に行ったことありますか？',
    images: [
      'https://images.pexels.com/photos/6538023/pexels-photo-6538023.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    tags: ['稲荷神', '狐信仰', '日本神話'],
    likes: 89,
    comments: 32,
    createdAt: new Date('2023-05-08')
  },
  {
    id: '3',
    userId: '3',
    username: 'anime_fox',
    userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    content: '新しく買った狐グッズを紹介します！この狐のぬいぐるみ、とっても可愛くないですか？🦊❤️',
    images: [
      'https://images.pexels.com/photos/4588019/pexels-photo-4588019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    tags: ['狐グッズ', 'コレクション'],
    likes: 207,
    comments: 45,
    createdAt: new Date('2023-05-05')
  },
  {
    id: '4',
    userId: '4',
    username: 'fox_traveler',
    userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    content: '宮城蔵王キツネ村に行ってきました！たくさんの狐と触れ合えて最高の体験でした。特に白狐が美しかったです。',
    images: [
      'https://images.pexels.com/photos/5208651/pexels-photo-5208651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/10633390/pexels-photo-10633390.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    tags: ['キツネ村', '宮城', '白狐'],
    location: {
      name: '宮城蔵王キツネ村',
      lat: 38.1355,
      lng: 140.6682
    },
    likes: 176,
    comments: 27,
    createdAt: new Date('2023-05-02')
  }
];

// Mock Locations
export const mockLocations: FoxLocation[] = [
  {
    id: '1',
    name: '伏見稲荷大社',
    description: '京都で最も有名な狐の聖地。何千もの朱色の鳥居が連なる千本鳥居が特徴的。稲荷神の使いである狐（稲荷狐）の像が多数あり、日本を代表する観光地の一つ。',
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
    description: '関東の伏見稲荷とも呼ばれる人気の稲荷神社。商売繁盛の神として知られ、多くの参拝者が訪れる。境内には狐の像が点在している。',
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
    description: '約100匹のキツネと触れ合える珍しい動物園。キツネたちと近い距離で写真撮影も可能。白狐など様々な種類のキツネが飼育されている。',
    type: 'sanctuary',
    address: '宮城県白石市福岡八宮字白菅11-3',
    lat: 38.1355,
    lng: 140.6682,
    images: ['https://images.pexels.com/photos/4588019/pexels-photo-4588019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
    rating: 4.3,
    reviews: 520,
    website: 'http://zao-fox-village.com/'
  },
  {
    id: '4',
    name: '葛城一言主神社',
    description: '白狐の伝説で知られる神社。九尾の白狐が現れたと言われる場所で、狐に関する様々な伝説が残っている。',
    type: 'shrine',
    address: '奈良県御所市櫛羅2467',
    lat: 34.4633,
    lng: 135.7408,
    images: ['https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
    rating: 4.1,
    reviews: 230
  }
];

// Mock Mythology
export const mockMythology: FoxMythology[] = [
  {
    id: '1',
    title: '九尾の狐と玉藻前',
    origin: '日本',
    period: '平安時代',
    description: '中国から日本に渡ってきた九尾の狐が、玉藻前として鳥羽天皇に仕えた伝説。美しい女性に化けた狐が、天皇を惑わすという物語。最終的に退治され、那須野ヶ原の殺生石となったと言われている。',
    images: ['https://images.pexels.com/photos/10633390/pexels-photo-10633390.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
    sources: ['古事記', '日本書紀', '今昔物語集'],
    relatedLocations: ['那須殺生石', '葛城一言主神社']
  },
  {
    id: '2',
    title: '稲荷神と白狐',
    origin: '日本',
    period: '奈良時代',
    description: '稲荷神の使いとされる白狐の伝承。稲荷神は穀物の神であり、商売繁盛の神としても信仰されている。白狐は稲荷神の意思を人間に伝える神聖な存在として崇められてきた。',
    images: ['https://images.pexels.com/photos/5208651/pexels-photo-5208651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
    sources: ['古事記', '日本霊異記'],
    relatedLocations: ['伏見稲荷大社', '豊川稲荷']
  },
  {
    id: '3',
    title: '狐の嫁入り',
    origin: '日本',
    period: '江戸時代',
    description: '晴れた日に雨が降る現象を「狐の嫁入り」と呼ぶ日本の言い伝え。狐が嫁入りする際に提灯行列を行うという伝説から来ている。地域によって様々な解釈があり、関東では良い兆しとされる一方、関西では不吉な兆しとされることもある。',
    images: ['https://images.pexels.com/photos/13080864/pexels-photo-13080864.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
    sources: ['日本民話集', '諸国百物語'],
    relatedLocations: []
  }
];

// Mock Media
export const mockMedia: FoxMedia[] = [
  {
    id: '1',
    title: '世界の終わりに柴犬と',
    type: 'manga',
    creator: '石原雄',
    year: 2018,
    description: 'ポストアポカリプスの世界を旅する少女と狐のような柴犬の物語。荒廃した世界での生存と絆を描く心温まる作品。',
    images: ['https://images.pexels.com/photos/6624862/pexels-photo-6624862.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
    tags: ['ポストアポカリプス', '柴犬', '冒険'],
    links: [
      { title: '公式サイト', url: '#' },
      { title: '購入リンク', url: '#' }
    ]
  },
  {
    id: '2',
    title: 'キツネの神様',
    type: 'anime',
    creator: '森田和明',
    year: 2019,
    description: '山奥の神社で暮らす少年と、そこに現れた神様の化身である白狐の交流を描くファンタジーアニメ。日本の伝統と自然の美しさを背景に、成長と信仰の物語が展開する。',
    images: ['https://images.pexels.com/photos/7846069/pexels-photo-7846069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
    tags: ['ファンタジー', '神話', '自然'],
    links: [
      { title: '公式サイト', url: '#' },
      { title: 'ストリーミング', url: '#' }
    ]
  },
  {
    id: '3',
    title: '九尾の伝説',
    type: 'game',
    creator: 'Fox Tales Studios',
    year: 2021,
    description: '日本の伝統的な狐の伝説をベースにした和風アクションRPG。プレイヤーは九尾の狐の力を持つ主人公となり、古代日本を舞台に冒険する。美しいビジュアルと日本神話の要素が特徴。',
    images: ['https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
    tags: ['RPG', '和風', 'アクション', '神話'],
    links: [
      { title: '公式サイト', url: '#' },
      { title: 'ダウンロード', url: '#' }
    ]
  },
  {
    id: '4',
    title: '狐の花嫁',
    type: 'book',
    creator: '高橋誠',
    year: 2017,
    description: '江戸時代を舞台に、人間に化けた狐と人間の男性の禁断の恋を描いた小説。日本の民話と歴史的背景を織り交ぜながら、種を超えた愛の物語を紡ぐ。',
    images: ['https://images.pexels.com/photos/13080849/pexels-photo-13080849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
    tags: ['恋愛', '時代小説', 'ファンタジー'],
    links: [
      { title: '出版社サイト', url: '#' },
      { title: '購入リンク', url: '#' }
    ]
  }
];

// Subscription Plans
export const subscriptionPlans = [
  {
    id: 'free',
    name: '無料プラン',
    price: 0,
    period: 'month',
    features: [
      { text: '基本的な投稿・閲覧機能', included: true },
      { text: '限定コンテンツへのアクセス', included: false },
      { text: 'お気に入り保存（最大10件）', included: true },
      { text: '広告表示あり', included: true },
      { text: 'パーソナルコレクション作成', included: false },
      { text: 'プレミアムデザインテーマ', included: false }
    ]
  },
  {
    id: 'premium-monthly',
    name: 'プレミアム',
    price: 580,
    period: 'month',
    recommended: true,
    features: [
      { text: '基本的な投稿・閲覧機能', included: true },
      { text: '限定コンテンツへのアクセス', included: true },
      { text: '無制限のお気に入り保存', included: true },
      { text: '広告非表示', included: true },
      { text: 'パーソナルコレクション作成', included: true },
      { text: 'プレミアムデザインテーマ', included: true }
    ]
  },
  {
    id: 'premium-yearly',
    name: 'プレミアム（年間）',
    price: 5800,
    period: 'year',
    features: [
      { text: '基本的な投稿・閲覧機能', included: true },
      { text: '限定コンテンツへのアクセス', included: true },
      { text: '無制限のお気に入り保存', included: true },
      { text: '広告非表示', included: true },
      { text: 'パーソナルコレクション作成', included: true },
      { text: 'プレミアムデザインテーマ', included: true }
    ]
  }
];