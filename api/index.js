import express from 'express';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// Platform Database (API-driven design)
const platformData = {
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
  },
  'next-topper': {
    name: 'NEXT TOPPER',
    tagline: 'Your Path to Excellence',
    logo: 'https://www.image2url.com/r2/default/images/1785386998131-40cc4721-6853-4b0b-875a-f312d65c923f.png',
    websiteUrl: 'https://nt.sumitkumawat.eu.org/',
    description: 'NEXT TOPPER is the ultimate learning platform designed to help you achieve your academic goals and become the next topper.',
    stats: { rating: '4.9', reviews: '10K+', downloads: '100K+', age: '3+' },
    tags: ['Education', 'Exam Prep', 'Learning'],
    comingSoon: false,
    screenshots: [
      'https://www.image2url.com/r2/default/images/1785396097736-dfef3f00-c807-4c4b-b374-81c601891f61.png',
      'https://www.image2url.com/r2/default/images/1785398143493-c1c9058c-8cc4-4699-b69e-521007030ba1.png',
      'https://www.image2url.com/r2/default/images/1785396436038-96426ee3-bba7-4e38-95b6-20d090a89e65.png',
      'https://www.image2url.com/r2/default/images/1785396508407-cb9df2d6-28ea-47e1-bad3-a066f985b11e.png',
      'https://www.image2url.com/r2/default/images/1785396895482-a054a78d-7d40-4548-b07e-7959acaac49b.png'
    ],
    theme: 'from-emerald-500 to-teal-500',
    shadow: 'shadow-emerald-500/40',
    accent: 'bg-emerald-50 text-emerald-600',
    buttonColor: 'bg-emerald-600 hover:bg-emerald-700',
    logoFit: 'cover',
    screenshotLayout: 'landscape'
  }
};

// Middleware
app.use(express.json());

// API Endpoints
app.get('/api/platforms', (req, res) => {
  res.json(platformData);
});

app.get('/api/platforms/:id', (req, res) => {
  const platform = platformData[req.params.id];
  if (!platform) {
    return res.status(404).json({ error: 'Platform not found' });
  }
  res.json(platform);
});

export default app;
