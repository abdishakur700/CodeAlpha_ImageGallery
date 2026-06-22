import React, { useState, useEffect } from 'react';
import { ImageItem } from '../types';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Download,
  Share2,
  Camera,
  Calendar,
  User,
  Sliders,
  Play,
  Pause,
  Info,
  Trash2
} from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  images: ImageItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  onToggleLike: (id: string | number) => void;
  onDelete: (id: string | number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNavigate,
  onToggleLike,
  onDelete,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  const activeImage = images[currentIndex];

  // Slideshow logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && isOpen) {
      interval = setInterval(() => {
        onNavigate((currentIndex + 1) % images.length);
      }, 5000); // 5 sec per slide
    }
    return () => clearInterval(interval);
  }, [isPlaying, isOpen, currentIndex, images.length, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length]);

  if (!isOpen || !activeImage) return null;

  const handleNext = () => {
    onNavigate((currentIndex + 1) % images.length);
  };

  const handlePrev = () => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  };

  const handleDownload = () => {
    // In React inside a preview, triggering a secure download via blob is extremely professional
    const link = document.createElement('a');
    link.href = activeImage.url;
    link.download = `${activeImage.title.replace(/\s+/g, '_')}_Abdishakur.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    // Simulate copying image URL or metadata link to clipboard
    navigator.clipboard.writeText(activeImage.url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  return (
    <div
      id="lightbox"
      className="fixed inset-0 z-50 flex flex-col md:flex-row items-stretch justify-between bg-black/95 backdrop-blur-lg animate-fade-in"
    >
      {/* LEFT / CENTER VIEWPORT (The Image & Quick Overlays) */}
      <div className="relative flex-grow flex items-center justify-center p-4 md:p-8 bg-black/40 overflow-hidden select-none">
        {/* Top Controls Overlay bar */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-50">
          {/* Progress / Status Indicators */}
          <div className="flex items-center gap-3">
            <span className="text-on-surface font-mono text-sm bg-surface-container/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 shadow-md flex items-center gap-1.5" id="lightbox-counter">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              {currentIndex + 1} <span className="text-white/40">/</span> {images.length}
            </span>

            {/* Play/Pause Slideshow Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-2.5 rounded-full backdrop-blur-md border transition-all duration-300 ${
                isPlaying
                  ? 'bg-primary/20 border-primary/40 text-primary shadow-[0_0_10px_rgba(164,201,255,0.2)]'
                  : 'bg-surface-container/60 border-white/5 text-white/70 hover:text-white hover:bg-surface-container-high'
              }`}
              title={isPlaying ? 'Pause slideshow (Space)' : 'Play slideshow (Space)'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-primary" /> : <Play className="w-4 h-4" />}
            </button>
          </div>

          {/* Core Closure & View details triggers */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className={`p-2.5 rounded-full border backdrop-blur-md transition-all ${
                showDetails
                  ? 'bg-white/10 border-white/20 text-white'
                  : 'bg-surface-container/60 border-white/5 text-white/50 hover:text-white'
              } md:flex hidden`}
              title="Toggle specifications sidebar"
            >
              <Info className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white bg-surface-container/60 border border-white/5 hover:border-white/20 backdrop-blur-md p-2.5 rounded-full transition-all focus:outline-none"
              id="lightbox-close"
              title="Close gallery viewer (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-primary hover:scale-105 active:scale-95 bg-surface-container/40 border border-white/5 backdrop-blur-md p-3.5 rounded-full transition-all z-40 shadow-xl"
          id="lightbox-prev"
          title="Previous Image (Left Arrow)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-primary hover:scale-105 active:scale-95 bg-surface-container/40 border border-white/5 backdrop-blur-md p-3.5 rounded-full transition-all z-40 shadow-xl"
          id="lightbox-next"
          title="Next Image (Right Arrow)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Image Frame */}
        <div className="max-w-full max-h-[85vh] md:max-h-full flex flex-col items-center justify-center transition-all duration-300">
          <img
            src={activeImage.url}
            alt={activeImage.title}
            className="max-w-full max-h-[72vh] md:max-h-[83vh] object-contain rounded-lg shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] filter transition-all duration-300 cursor-zoom-in"
            id="lightbox-img"
            referrerPolicy="no-referrer"
          />

          {/* Compact bottom details on Mobile - or if Sidebar is collapsed */}
          {(!showDetails || window.innerWidth < 768) && (
            <div className="mt-4 text-center max-w-xl animate-fade-in px-4">
              <h4 className="text-white text-base font-headline font-bold">{activeImage.title}</h4>
              <p className="text-white/50 text-xs mt-1">by {activeImage.author}</p>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT DRAWER / SPECIFICATIONS SIDEBAR (Cinematic details & triggers) */}
      {showDetails && (
        <div className="w-full md:w-[380px] lg:w-[420px] bg-[#121414] border-t md:border-t-0 md:border-l border-outline-variant/20 flex flex-col justify-between shrink-0 select-none animate-slide-left overflow-y-auto">
          {/* Header specification title */}
          <div className="p-6 md:p-8 border-b border-outline-variant/10">
            <span className="text-primary font-mono text-xs uppercase tracking-widest font-semibold">
              IMAGE METADATA & ARTIFACT
            </span>
            <h2 className="text-white font-headline text-2xl font-bold mt-2 leading-tight">
              {activeImage.title}
            </h2>
            <div className="flex items-center gap-2 mt-3 text-body-md text-on-surface-variant">
              <User className="w-4 h-4 text-primary/70" />
              <span className="font-medium text-white/80">Photographed by {activeImage.author}</span>
            </div>
          </div>

          {/* Cinematic AI / Design Prompt Box */}
          <div className="p-6 md:p-8 space-y-6 flex-grow">
            <div className="space-y-2">
              <h4 className="text-xs text-on-surface-variant font-mono uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-primary" /> Cinematic Prompts & Directives
              </h4>
              <div className="bg-surface-container rounded-xl p-4 border border-outline-variant/10 text-on-surface text-sm leading-relaxed italic font-light">
                "{activeImage.prompt}"
              </div>
            </div>

            {/* EXIF Tech specs grid */}
            <div className="space-y-4">
              <h4 className="text-xs text-on-surface-variant font-mono uppercase tracking-wider flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-primary" /> Camera Setup & Gear
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-surface-container-low rounded-lg p-3 border border-outline-variant/5">
                  <span className="text-[10px] text-white/40 font-mono uppercase block">Aperture</span>
                  <span className="text-sm text-white font-mono font-medium">{activeImage.cameraSettings.aperture}</span>
                </div>
                <div className="bg-surface-container-low rounded-lg p-3 border border-outline-variant/5">
                  <span className="text-[10px] text-white/40 font-mono uppercase block">Shutter Speed</span>
                  <span className="text-sm text-white font-mono font-medium">{activeImage.cameraSettings.shutterSpeed}</span>
                </div>
                <div className="bg-surface-container-low rounded-lg p-3 border border-outline-variant/5">
                  <span className="text-[10px] text-white/40 font-mono uppercase block">Sensory ISO</span>
                  <span className="text-sm text-white font-mono font-medium">{activeImage.cameraSettings.iso}</span>
                </div>
                <div className="bg-surface-container-low rounded-lg p-3 border border-outline-variant/5">
                  <span className="text-[10px] text-white/40 font-mono uppercase block">Capture Artifact Date</span>
                  <span className="text-xs text-white font-mono truncate block" title={new Date(activeImage.createdAt).toLocaleDateString()}>
                    {new Date(activeImage.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="bg-surface-container-low rounded-lg p-3 border border-outline-variant/5 flex items-center gap-3">
                <div className="p-2 rounded-md bg-black/40 text-primary">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-white/40 font-mono uppercase block">Optic Hardware</span>
                  <span className="text-xs text-white font-sans font-medium">{activeImage.cameraSettings.lens}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social / Interactive Deck */}
          <div className="p-6 md:p-8 bg-surface-container-lowest border-t border-outline-variant/10 space-y-4">
            <div className="flex items-center justify-between text-xs text-on-surface-variant font-mono pb-2">
              <span className="uppercase tracking-wider">Interactive Options</span>
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> {activeImage.likes + (activeImage.isLiked ? 1 : 0)} likes
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5">
              {/* Like Button */}
              <button
                onClick={() => onToggleLike(activeImage.id)}
                className={`py-3 px-1 rounded-xl border flex flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-all duration-200 ${
                  activeImage.isLiked
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                    : 'bg-surface-container border-outline-variant/10 text-on-surface-variant hover:text-white hover:border-white/20'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${activeImage.isLiked ? 'fill-rose-500 text-rose-400' : ''}`} />
                <span>Like</span>
              </button>

              {/* Download Image Button */}
              <button
                onClick={handleDownload}
                className="py-3 px-1 rounded-xl bg-surface-container border border-outline-variant/10 text-on-surface-variant hover:text-white hover:border-white/20 flex flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-all duration-200"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save</span>
              </button>

              {/* Share Image Button */}
              <button
                onClick={handleShare}
                className={`py-3 px-1 rounded-xl border flex flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-all duration-200 ${
                  copiedLink
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-surface-container border-outline-variant/10 text-on-surface-variant hover:text-white hover:border-white/20'
                }`}
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Copied' : 'Share'}</span>
              </button>

              {/* Delete Image Button */}
              <button
                onClick={() => onDelete(activeImage.id)}
                className="py-3 px-1 rounded-xl bg-surface-container border border-outline-variant/10 text-on-surface-variant hover:text-rose-400 hover:bg-rose-950/20 hover:border-rose-500/30 flex flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-all duration-200"
                title="Delete photographic work"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
