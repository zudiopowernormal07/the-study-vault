export interface Platform {
  name: string;
  tagline: string;
  logo: string;
  websiteUrl: string;
  description: string;
  stats: {
    rating: string;
    reviews: string;
    downloads: string;
    age: string;
  };
  tags: string[];
  screenshots: string[];
  theme: string;
  shadow: string;
  accent: string;
  buttonColor: string;
  comingSoon?: boolean;
  logoFit?: 'contain' | 'cover';
  screenshotLayout?: 'portrait' | 'landscape';
}

export const platformDataFallback: Record<string, Platform> = {
  'pw': {
    name: 'Physics Wallah',
    tagline: 'Quality Education',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Physics_wallah_logo.svg/1280px-Physics_wallah_logo.svg.png',
    websiteUrl: 'https://pw.sumitkumawat.eu.org/',
    description: 'Physics Wallah provides high-quality and affordable education. Access live classes, structured video lectures, and practice materials for a wide range of exams including JEE, NEET, and board preparations.',
    stats: { rating: '4.8', reviews: '5M', downloads: '10M+', age: '3+' },
    tags: ['Education', 'Online Classes', 'Live Streams'],
    screenshots: [
      'https://www.image2url.com/r2/default/images/1784892201290-57e05992-8bd0-463f-a0ca-5085a2003b21.jpg',
      'https://www.image2url.com/r2/default/images/1784892264280-688799b6-8489-49a2-b4de-980a78cbc81c.jpg',
      'https://www.image2url.com/r2/default/images/1784892303181-8672603d-ded6-4911-ae63-d510bb27c3dc.jpg',
      'https://www.image2url.com/r2/default/images/1784892345127-c64b870d-3be0-4a1c-91a7-3a6a6f2142e8.jpg',
      'https://www.image2url.com/r2/default/images/1784892383957-e5802220-da91-4abf-aeaa-75383df7097d.jpg'
    ],
    theme: 'from-blue-500 to-cyan-400',
    shadow: 'shadow-blue-500/40',
    accent: 'bg-blue-50 text-blue-600',
    buttonColor: 'bg-blue-600 hover:bg-blue-700',
    logoFit: 'contain',
    screenshotLayout: 'portrait'
  },
  'selection-way': {
    name: 'Selection Way',
    tagline: 'Path to Success',
    logo: 'https://www.selectionway.com/next_images/logo.png',
    websiteUrl: 'https://sw.sumitkumawat.eu.org/',
    description: 'Selection Way provides you the perfect path to success in competitive exams. Benefit from structured courses, daily current affairs, and comprehensive test series tailored to help you crack the toughest exams.',
    stats: { rating: '4.9', reviews: '10K', downloads: '500K+', age: '3+' },
    tags: ['Education', 'Exam Prep', 'Mock Tests'],
    screenshots: [
      'https://www.image2url.com/r2/default/images/1784686957981-1e9e7a4f-4456-4f5f-b5b9-a1652447cc07.jpg',
      'https://www.image2url.com/r2/default/images/1784687026304-56a48f5d-2286-41b1-8de3-01f8ad1b26d7.jpg',
      'https://www.image2url.com/r2/default/images/1784687065662-b15fd558-4ae1-4ccc-a114-cee89f2866d0.jpg',
      'https://www.image2url.com/r2/default/images/1784687139057-e5161870-dc11-46ee-84a9-e9594bae31b5.jpg',
      'https://www.image2url.com/r2/default/images/1784687224123-0d7ec23e-1f1a-4926-9aac-cf916f6a9d2b.jpg'
    ],
    theme: 'from-purple-500 to-pink-500',
    shadow: 'shadow-purple-500/40',
    accent: 'bg-purple-50 text-purple-600',
    buttonColor: 'bg-purple-600 hover:bg-purple-700',
    logoFit: 'cover',
    screenshotLayout: 'portrait'
  },
  'rwa': {
    name: 'Rojgar With Ankit',
    tagline: 'Competitive Exams',
    logo: 'https://play-lh.googleusercontent.com/0JDg57CGRdiC7YDLcISuIj5_k-SPSxYHSkySMFzccJ-pQ403bORp4qpUtMdei1JOJD8_IrEunVHs0r3Qvoli3A=w1024-h1024',
    websiteUrl: 'https://rwa.sumitkumawat.eu.org/',
    description: 'Rojgar With Ankit is your ultimate companion for government exam preparation. Get access to live classes, mock tests, and expert guidance to secure your dream job.',
    stats: { rating: '4.8', reviews: '1M+', downloads: '5M+', age: '3+' },
    tags: ['Education', 'Govt Exams', 'Preparation'],
    comingSoon: false,
    screenshots: [
      'https://www.image2url.com/r2/default/images/1784686747332-733d95d9-3021-4981-a6b6-08e368630718.jpg',
      'https://www.image2url.com/r2/default/images/1784686812700-2e023d05-e843-4b9a-89a3-2410cd1be5ee.jpg',
      'https://www.image2url.com/r2/default/images/1784686867562-f3a066d5-a974-4c94-8824-885a222d7878.jpg',
      'https://www.image2url.com/r2/default/images/1784686918809-ebadedad-3633-483e-87ad-08897500df39.jpg'
    ],
    theme: 'from-amber-500 to-orange-500',
    shadow: 'shadow-amber-500/40',
    accent: 'bg-amber-50 text-amber-600',
    buttonColor: 'bg-amber-500 hover:bg-amber-600',
    logoFit: 'cover',
    screenshotLayout: 'portrait'
  }
};
