import { useState, useEffect, useMemo, MouseEvent } from 'react';
import { ImageItem, CategoryType, CSSFilterType } from './types';
import { PRESET_IMAGES } from './data/galleryData';
import { GalleryCard } from './components/GalleryCard';
import { FilterControls } from './components/FilterControls';
import { Lightbox } from './components/Lightbox';
import { AddImageModal } from './components/AddImageModal';
import { Sparkles, RotateCcw, Camera, Flame, Eye, Heart, Compass, Plus, LogOut } from 'lucide-react';

export default function App() {
  // Load initial images or read from local storage
  const [images, setImages] = useState<ImageItem[]>(() => {
    const saved = localStorage.getItem('abdishakur_gallery_images_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Error loading Abdishakur images from local storage', error);
      }
    }
    return PRESET_IMAGES;
  });

  // Active filters and presentation options
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [activeCSSFilter, setActiveCSSFilter] = useState<CSSFilterType>('none');

  // Modals state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(0);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Persistence side-effects
  useEffect(() => {
    localStorage.setItem('abdishakur_gallery_images_v2', JSON.stringify(images));
  }, [images]);

  // Compute filtered images based on category state
  const filteredImages = useMemo(() => {
    if (activeCategory === 'all') {
      return images;
    }
    return images.filter((img) => img.category === activeCategory);
  }, [images, activeCategory]);

  // Sync index navigation in case of category swaps when lightbox is open
  const handleNavigateLightbox = (index: number) => {
    if (index >= 0 && index < filteredImages.length) {
      setActiveLightboxIndex(index);
    }
  };

  // Toggle image Like / Favorite status
  const handleToggleLike = (id: string | number, e?: MouseEvent) => {
    if (e) {
      e.stopPropagation(); // Avoid triggering openLightbox
    }
    setImages((prevImages) =>
      prevImages.map((img) => {
        if (img.id === id) {
          const isLiked = !img.isLiked;
          return {
            ...img,
            isLiked,
            // Visual simulation of high-end likes ticker
            likes: isLiked ? img.likes + 1 : Math.max(0, img.likes - 1),
          };
        }
        return img;
      })
    );
  };

  // Delete dynamic image item completely
  const handleDeleteImage = (id: string | number, e?: MouseEvent) => {
    if (e) {
      e.stopPropagation(); // Avoid triggering openLightbox
    }

    setImages((prevImages) => {
      const nextImages = prevImages.filter((img) => img.id !== id);

      // Align active lightbox details
      if (lightboxOpen) {
        const nextFiltered = nextImages.filter(
          (img) => activeCategory === 'all' || img.category === activeCategory
        );

        if (nextFiltered.length === 0) {
          setLightboxOpen(false);
        } else {
          setActiveLightboxIndex((prevIdx) => {
            if (prevIdx >= nextFiltered.length) {
              return nextFiltered.length - 1;
            }
            return prevIdx;
          });
        }
      }
      return nextImages;
    });
  };

  // Append new custom user generation to main gallery list
  const handleAddCustomImage = (newImage: ImageItem) => {
    // Places the newest image at the top of the grid view
    setImages((prevImages) => [newImage, ...prevImages]);
    // Optionally focus the category of parent
    setActiveCategory(newImage.category);
  };

  // Clear local custom images and restore original fine-art presets
  const handleResetToPresets = () => {
    if (window.confirm('Would you like to reset the Abdishakur Gallery to the original pre-curated 12 art presets? This will remove custom creations.')) {
      setImages(PRESET_IMAGES);
      setActiveCategory('all');
      setActiveCSSFilter('none');
    }
  };

  // Check if any custom images exist
  const hasCustomAdditions = useMemo(() => {
    const presetIds = PRESET_IMAGES.map((p) => p.id);
    return images.some((img) => !presetIds.includes(img.id));
  }, [images]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-on-surface select-none relative overflow-x-hidden antialiased">
      
      {/* GLOW DECORATIONS (Atmospheric lights) */}
      <div className="absolute top-[-10%] left-[-15%] w-[50%] h-[50vh] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-15%] w-[45%] h-[45vh] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      {/* FIXED HEADER / NAVIGATION BAR */}
      <nav className="bg-surface/75 backdrop-blur-xl border-b border-outline-variant/10 fixed top-0 w-full z-40 transition-all duration-300">
        <div className="flex justify-between items-center w-full px-6 md:px-12 max-w-7xl mx-auto h-16">
          
          {/* Brand Logo & Vibe */}
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary">
              <Camera className="w-5 h-5" />
            </div>
            <span className="font-display font-bold text-lg md:text-xl tracking-tight text-white flex items-center gap-1.5">
              Abdishakur <span className="text-primary font-light text-xs tracking-widest uppercase border-l border-white/20 pl-2">Gallery</span>
            </span>
          </div>

          {/* Desktop Navigation Category Links */}
          <div className="hidden md:flex items-center gap-6">
            {(['all', 'nature', 'animals', 'cities', 'technology'] as CategoryType[]).map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-sm font-semibold tracking-wide capitalize transition-all duration-200 relative py-1 focus:outline-none ${
                    isActive
                      ? 'text-primary'
                      : 'text-on-surface-variant hover:text-white'
                  }`}
                >
                  {cat === 'all' ? 'All Art' : cat}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full animate-fade-in" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Core Controls & CTA button */}
          <div className="flex items-center gap-3">
            {/* Reset to Presets Button (shown selectively if user added custom images) */}
            {hasCustomAdditions && (
              <button
                onClick={handleResetToPresets}
                className="p-2 rounded-xl bg-surface-container/60 hover:bg-surface-container border border-outline-variant/10 text-white/60 hover:text-white uppercase font-mono text-[10px] tracking-wider transition-all flex items-center gap-1.5"
                title="Restore default pre-curated 12 presets"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}

            {/* Custom Create action */}
            <button
              onClick={() => setAddModalOpen(true)}
              className="py-2.5 px-4 rounded-xl bg-primary text-black font-bold text-xs flex items-center gap-2 hover:bg-primary-container active:scale-95 transition-all shadow-md shadow-primary/15"
              title="Add custom fine-art photography prompt"
            >
              <Plus className="w-3.5 h-3.5 text-black" />
              <span>Add Art</span>
            </button>
          </div>
        </div>
      </nav>

      {/* CORE CONTENT PORTAL */}
      <main
        className={`flex-grow pt-24 px-6 md:px-12 max-w-7xl mx-auto w-full pb-16 transition-all duration-500 filter-${activeCSSFilter}`}
      >
        {/* Gallery Intro Frame */}
        <div className="mb-10 animate-fade-in">
          <h1 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-white">
            Cinematic Photography
          </h1>
          <p className="text-on-surface-variant text-sm md:text-base mt-2 max-w-2xl font-light leading-relaxed">
            Delve into an aesthetic curation of fine-art photography and futuristic prompts. Adjust filters in real-time or add custom photographic parameters to mount onto the stream.
          </p>
        </div>

        {/* Filters Controls Deck (Categories and Lens Selection) */}
        <FilterControls
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          activeCSSFilter={activeCSSFilter}
          onSelectCSSFilter={setActiveCSSFilter}
          totalCount={filteredImages.length}
        />

        {/* Image Grid Display */}
        {filteredImages.length > 0 ? (
          <div
            id="gallery-grid"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-0.5"
          >
            {filteredImages.map((itm, idx) => (
              <GalleryCard
                key={itm.id}
                item={itm}
                index={idx}
                onOpenLightbox={() => {
                  setActiveLightboxIndex(idx);
                  setLightboxOpen(true);
                }}
                onToggleLike={(id, e) => handleToggleLike(id, e)}
                onDelete={(id, e) => handleDeleteImage(id, e)}
              />
            ))}
          </div>
        ) : (
          /* Empty Curation State */
          <div className="flex flex-col items-center justify-center p-12 md:p-20 text-center bg-surface-container/30 border border-outline-variant/10 rounded-2xl animate-fade-in max-w-2xl mx-auto my-6">
            <div className="p-4 rounded-full bg-surface-container-high/50 border border-outline-variant/10 text-primary mb-5">
              <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <h3 className="text-white font-headline text-lg font-bold">Unmapped Cinematic Frequency</h3>
            <p className="text-on-surface-variant text-sm max-w-md mt-2 mb-6 font-light">
              No fine-art assets found labeled under "{activeCategory}". Generate a fresh photographic work to mount onto this grid!
            </p>
            <button
              onClick={() => setAddModalOpen(true)}
              className="py-2.5 px-5 rounded-xl bg-primary text-black font-bold text-xs flex items-center gap-2 hover:bg-primary-container active:scale-95 transition-all shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Create Dynamic Image</span>
            </button>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0b0c0c] border-t border-outline-variant/10 w-full py-8 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-12 w-full max-w-7xl mx-auto gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
            <Camera className="w-4 h-4 text-primary" />
            <span className="font-display font-medium text-xs tracking-widest uppercase">ABDISHAKUR CINEMATIC</span>
          </div>

          {/* Copy info */}
          <div className="text-on-surface-variant/60 font-sans text-xs text-center md:text-left">
            © 2026 Abdishakur Cinematic Gallery. Created with premium front-end mechanics. All rights reserved.
          </div>

          {/* Extra utility menu links */}
          <div className="flex gap-6 text-xs text-on-surface-variant/80">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms and Scopes</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* MODAL CORES */}
      <Lightbox
        isOpen={lightboxOpen}
        images={filteredImages}
        currentIndex={activeLightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={handleNavigateLightbox}
        onToggleLike={(id) => handleToggleLike(id)}
        onDelete={(id) => handleDeleteImage(id)}
      />

      <AddImageModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAddImage={handleAddCustomImage}
      />
    </div>
  );
}

