import React from 'react';
import { ImageItem } from '../types';
import { Heart, Eye, ArrowUpRight, Trash2 } from 'lucide-react';

interface GalleryCardProps {
  item: ImageItem;
  index: number;
  onOpenLightbox: () => void;
  onToggleLike: (id: string | number, e: React.MouseEvent) => void;
  onDelete: (id: string | number, e: React.MouseEvent) => void;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({
  item,
  index,
  onOpenLightbox,
  onToggleLike,
  onDelete,
}) => {
  // Safe staggering delay for load-in effect
  const animationDelay = `${index * 50}ms`;

  return (
    <div
      id={`gallery-item-${item.id}`}
      className="gallery-item group relative overflow-hidden rounded-xl bg-surface-container border border-outline-variant/10 shadow-lg cursor-pointer aspect-[4/5] transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20"
      style={{
        animationDelay,
        animationPlayState: 'running',
      }}
      onClick={onOpenLightbox}
    >
      {/* Background Image with Hover Effect & CSS Filter target */}
      <img
        src={item.url}
        alt={item.title}
        loading="lazy"
        className="gallery-img absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        referrerPolicy="no-referrer"
      />

      {/* Aesthetic Thin Edge Border Glow */}
      <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 rounded-xl pointer-events-none transition-all duration-300" />

      {/* Dark Linear Gradient Overlay */}
      <div className="gallery-overlay absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5" />

      {/* Top action badge on hover */}
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={(e) => onToggleLike(item.id, e)}
          className={`p-2 rounded-full backdrop-blur-md border transition-all duration-200 ${
            item.isLiked
              ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
              : 'bg-black/50 border-white/10 text-white/80 hover:text-white hover:bg-black/70 hover:scale-105'
          }`}
          title={item.isLiked ? 'Unlike photography' : 'Like photography'}
        >
          <Heart className={`w-4 h-4 ${item.isLiked ? 'fill-rose-500 text-rose-400' : ''}`} />
        </button>

        {/* Delete button option */}
        <button
          onClick={(e) => onDelete(item.id, e)}
          className="p-2 rounded-full bg-black/50 border border-white/10 text-white/80 hover:text-rose-400 hover:bg-rose-950/40 hover:border-rose-500/30 backdrop-blur-md hover:scale-105 transition-all duration-200"
          title="Delete photographic work"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        <div className="p-2 rounded-full bg-black/50 border border-white/10 text-white/80 backdrop-blur-md">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      {/* Cinematic Metadata Details Text on Hover */}
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
        <div className="flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Category Chip */}
          <span className="text-primary font-mono text-[10px] uppercase tracking-widest font-semibold">
            {item.category}
          </span>
          
          {/* Image Title */}
          <h3 className="text-white font-headline text-lg md:text-xl font-bold leading-tight tracking-tight drop-shadow-md">
            {item.title}
          </h3>

          {/* Separation bar */}
          <div className="w-6 h-[1px] bg-primary/40 my-1 group-hover:w-16 transition-all duration-500" />

          {/* Author/Photographer Name */}
          <div className="flex justify-between items-center text-on-surface-variant font-sans text-xs">
            <span className="font-medium text-white/70">by {item.author}</span>
            <span className="font-mono text-white/50 flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 inline text-white/40" /> {item.likes + (item.isLiked ? 1 : 0)}
            </span>
          </div>
        </div>
      </div>
      
      {/* Default Subtle Static Bottom Title Overlay (Visible when not hovered, for visual structure) */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:translate-y-8 group-hover:opacity-0 transition-all duration-300 flex justify-between items-end pointer-events-none">
        <div>
          <span className="text-[#A0A0A0] font-mono text-[9px] uppercase tracking-wider block mb-0.5">
            {item.category}
          </span>
          <span className="text-on-surface font-headline font-semibold text-sm line-clamp-1 block">
            {item.title}
          </span>
        </div>
        <span className="text-on-surface-variant/60 font-mono text-[10px] shrink-0">
          {item.cameraSettings.aperture}
        </span>
      </div>
    </div>
  );
};
