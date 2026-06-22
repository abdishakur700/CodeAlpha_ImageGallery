import { ImageItem } from '../types';

export const PRESET_IMAGES: ImageItem[] = [
  {
    id: 1,
    category: 'nature',
    title: 'Misty Mountain Peak',
    prompt: 'A breathtaking landscape photograph of a towering, misty mountain peak at dawn. The scene is enveloped in soft, cool blue and grey morning fog, contrasting with the dark, jagged rocks. The lighting is cinematic, highlighting the rugged textures and creating a serene, immersive, and expansive natural atmosphere.',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&h=1500&q=85',
    author: 'Elena Rostova',
    likes: 428,
    isLiked: false,
    cameraSettings: {
      aperture: 'f/8.0',
      shutterSpeed: '1/250s',
      iso: '100',
      lens: 'FE 24-70mm f/2.8 GM II'
    },
    createdAt: '2024-05-12T05:30:00Z'
  },
  {
    id: 2,
    category: 'nature',
    title: 'Deep Forest Path',
    prompt: 'A lush, deep forest path viewed through a cinematic lens. Tall, ancient trees with dark bark frame a winding trail. Dappled sunlight filters through the dense, vibrant green canopy, creating high-contrast patches of light on the forest floor. The mood is tranquil, mysterious, and deeply atmospheric.',
    url: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&h=1500&q=85',
    author: 'Marcus Vance',
    likes: 312,
    isLiked: false,
    cameraSettings: {
      aperture: 'f/4.0',
      shutterSpeed: '1/80s',
      iso: '400',
      lens: 'GF32-64mm f/4 R LM WR'
    },
    createdAt: '2024-05-15T09:45:00Z'
  },
  {
    id: 3,
    category: 'nature',
    title: 'Serene Waterfall',
    prompt: 'A stunning, slow-shutter photograph of a serene waterfall cascading over dark, moss-covered rocks into a clear pool. The water appears smooth and silky against the rugged, dark environment. The lighting is soft and diffuse, creating a calming, minimalist, and high-end nature aesthetic.',
    url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200&h=1500&q=85',
    author: 'Sora Takahashi',
    likes: 589,
    isLiked: false,
    cameraSettings: {
      aperture: 'f/11',
      shutterSpeed: '2.5s',
      iso: '64',
      lens: 'NIKKOR Z 14-30mm f/4 S'
    },
    createdAt: '2024-05-18T14:20:00Z'
  },
  {
    id: 4,
    category: 'animals',
    title: 'Arctic Fox in Snow',
    prompt: 'A striking portrait of an Arctic Fox resting in a pristine, snow-covered landscape. The stark white environment emphasizes the elegant lines of the fox. The lighting is bright and crisp, offering a clean, minimalist aesthetic with high contrast between the soft white snow and the subtle details of the animal.',
    url: 'https://images.unsplash.com/photo-1517770413964-df8ca61194a6?auto=format&fit=crop&w=1200&h=1500&q=85',
    author: 'Nils Amundsen',
    likes: 724,
    isLiked: false,
    cameraSettings: {
      aperture: 'f/5.6',
      shutterSpeed: '1/1000s',
      iso: '200',
      lens: 'RF100-500mm f/4.5-7.1 L IS USM'
    },
    createdAt: '2024-05-20T11:15:00Z'
  },
  {
    id: 5,
    category: 'animals',
    title: 'Majestic Eagle Flight',
    prompt: 'A high-speed, sharp photograph of a majestic eagle in mid-flight against a deep, dramatic sky. The eagle\'s wingspan is fully extended, showcasing intricate feather details. The dark, moody background highlights the dynamic motion and raw power of the bird in a cinematic style.',
    url: 'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?auto=format&fit=crop&w=1200&h=1500&q=85',
    author: 'Clara Dupont',
    likes: 819,
    isLiked: false,
    cameraSettings: {
      aperture: 'f/4.0',
      shutterSpeed: '1/2000s',
      iso: '320',
      lens: 'FE 400mm f/2.8 GM OSS'
    },
    createdAt: '2024-05-22T08:05:00Z'
  },
  {
    id: 6,
    category: 'animals',
    title: 'Wild Horse Running',
    prompt: 'A powerful, cinematic shot of a wild horse running across a dusty plain at sunset. The low, warm golden light creates long shadows and highlights the muscular build of the horse. The dust kicked up by its hooves adds a gritty, atmospheric texture to the dramatic scene.',
    url: 'https://images.unsplash.com/photo-1551884831-bbf3cdc67377?auto=format&fit=crop&w=1200&h=1500&q=85',
    author: 'Wyatt Sterling',
    likes: 641,
    isLiked: false,
    cameraSettings: {
      aperture: 'f/2.8',
      shutterSpeed: '1/1600s',
      iso: '160',
      lens: 'EF 70-200mm f/2.8L IS III USM'
    },
    createdAt: '2024-05-25T19:40:00Z'
  },
  {
    id: 7,
    category: 'cities',
    title: 'Neon Cyberpunk Street',
    prompt: 'A moody, cinematic photograph of a futuristic city street at night, inspired by cyberpunk aesthetics. The scene is illuminated by vibrant neon lights reflecting off wet, dark asphalt. Tall, dark skyscrapers loom in the background, creating a dense, immersive, and high-tech urban environment.',
    url: 'https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?auto=format&fit=crop&w=1200&h=1500&q=85',
    author: 'Kenji Sato',
    likes: 954,
    isLiked: false,
    cameraSettings: {
      aperture: 'f/1.8',
      shutterSpeed: '1/125s',
      iso: '800',
      lens: 'FE 50mm f/1.2 GM'
    },
    createdAt: '2024-05-28T22:10:00Z'
  },
  {
    id: 8,
    category: 'cities',
    title: 'Minimalist Architecture',
    prompt: 'A clean, abstract photograph of modern minimalist architecture. The composition focuses on sharp geometric angles, smooth concrete surfaces, and deep shadows against a clear sky. The monochromatic palette and precise lines create a sophisticated, highly curated structural aesthetic.',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&h=1500&q=85',
    author: 'Linus Bergman',
    likes: 387,
    isLiked: false,
    cameraSettings: {
      aperture: 'f/8.0',
      shutterSpeed: '1/320s',
      iso: '100',
      lens: 'TS-E 24mm f/3.5L II Tilts-Shift'
    },
    createdAt: '2024-06-01T10:30:00Z'
  },
  {
    id: 9,
    category: 'cities',
    title: 'Skyline at Dusk',
    prompt: 'A panoramic view of a massive city skyline at dusk. The sky transitions from a deep, bruised purple to dark blue. The city buildings are silhouetted, with thousands of tiny, warm glowing windows creating a vast, intricate grid of light. The mood is quiet yet immense.',
    url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&h=1500&q=85',
    author: 'Sarah Jenkins',
    likes: 893,
    isLiked: false,
    cameraSettings: {
      aperture: 'f/5.6',
      shutterSpeed: '1/15s',
      iso: '400',
      lens: 'GF20-35mm f/4 R WR'
    },
    createdAt: '2024-06-03T20:55:00Z'
  },
  {
    id: 10,
    category: 'technology',
    title: 'Quantum Processor Core',
    prompt: 'A macro photograph of a highly advanced quantum processor core. The image features complex, glowing metallic structures with microscopic circuitry details. The lighting is sleek and artificial, with subtle blue and gold highlights against a deep black void, emphasizing high-end technological precision.',
    url: 'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&w=1200&h=1500&q=85',
    author: 'T-800 Labs',
    likes: 1024,
    isLiked: false,
    cameraSettings: {
      aperture: 'f/5.6',
      shutterSpeed: '1/60s',
      iso: '200',
      lens: 'FE 90mm f/2.8 Macro G OSS'
    },
    createdAt: '2024-06-05T15:15:00Z'
  },
  {
    id: 11,
    category: 'technology',
    title: 'Abstract Data Stream',
    prompt: 'An abstract, generative digital art representation of a data stream. Glowing, sharp lines of light interweave through a dark, minimalist digital space. The color palette focuses on deep blacks, sharp whites, and electric blue accents, conveying speed, connectivity, and modern technology.',
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&h=1500&q=85',
    author: 'Pixel Cipher',
    likes: 711,
    isLiked: false,
    cameraSettings: {
      aperture: 'Digital Gen',
      shutterSpeed: 'N/A',
      iso: '0',
      lens: 'Matrix Synthesizer v4.1'
    },
    createdAt: '2024-06-08T03:00:00Z'
  },
  {
    id: 12,
    category: 'technology',
    title: 'Robotic Precision Arm',
    prompt: 'A sleek, detailed shot of an industrial robotic arm in a clean, dark manufacturing environment. The metallic surfaces are highly polished, reflecting stark, focused spotlights. The composition highlights the geometric precision and mechanical elegance of the machine.',
    url: 'https://images.unsplash.com/photo-1616363088386-31c4a85148a0?auto=format&fit=crop&w=1200&h=1500&q=85',
    author: 'Vektor Corp',
    likes: 549,
    isLiked: false,
    cameraSettings: {
      aperture: 'f/2.8',
      shutterSpeed: '1/250s',
      iso: '250',
      lens: 'XF 50-140mm f/2.8 R LM OIS WR'
    },
    createdAt: '2024-06-10T12:00:00Z'
  }
];
