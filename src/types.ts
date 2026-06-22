export interface CameraSettings {
  aperture: string;
  shutterSpeed: string;
  iso: string;
  lens: string;
}

export type CategoryType = 'all' | 'nature' | 'animals' | 'cities' | 'technology';

export type CSSFilterType = 'none' | 'grayscale' | 'sepia' | 'blur';

export interface ImageItem {
  id: string | number;
  category: 'nature' | 'animals' | 'cities' | 'technology';
  title: string;
  prompt: string;
  url: string;
  author: string;
  likes: number;
  isLiked?: boolean;
  cameraSettings: CameraSettings;
  createdAt: string;
}
