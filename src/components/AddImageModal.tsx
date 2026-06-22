import React, { useState } from 'react';
import { ImageItem, CategoryType } from '../types';
import { X, Sparkles, Camera, Image, AlignLeft, User, CheckCircle2 } from 'lucide-react';

interface AddImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddImage: (newImage: ImageItem) => void;
}

// Custom style presets for beautiful quick generations
const PHOTO_STYLE_PRESETS = [
  {
    name: 'Cosmic Cyberpunk Glow',
    keyword: 'cyberpunk,neon,street',
    description: 'Vibrant cyberpunk neon lights at midnight.',
    url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&h=1500&q=85',
    camera: { aperture: 'f/1.4', shutterSpeed: '1/200s', iso: '800', lens: '50mm f/1.2' }
  },
  {
    name: 'Misty Ethereal Wilderness',
    keyword: 'forest,mist,morning',
    description: 'Golden morning light filtering through ancient pines.',
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&h=1500&q=85',
    camera: { aperture: 'f/5.6', shutterSpeed: '1/320s', iso: '100', lens: '24-70mm f/2.8' }
  },
  {
    name: 'Monochromatic Structural Line',
    keyword: 'architecture,minimalist,concrete',
    description: 'Clean geometry and harsh concrete shadows.',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&h=1500&q=85',
    camera: { aperture: 'f/8.0', shutterSpeed: '1/125s', iso: '100', lens: '35mm Tilt-Shift' }
  },
  {
    name: 'Golden Wildlife Portrait',
    keyword: 'stag,deer,wildlife,sunset',
    description: 'A wild forest animal standing at golden crest sunset.',
    url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&h=1500&q=85',
    camera: { aperture: 'f/2.8', shutterSpeed: '1/800s', iso: '250', lens: '400mm f/2.8' }
  },
  {
    name: 'Abstract Quantum Network',
    keyword: 'technology,abstract,matrix',
    description: 'Luminous blue digital matrix nodes traversing code.',
    url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&h=1500&q=85',
    camera: { aperture: 'Digital Gen', shutterSpeed: 'N/A', iso: '0', lens: 'Synth Core v2.4' }
  }
];

export const AddImageModal: React.FC<AddImageModalProps> = ({
  isOpen,
  onClose,
  onAddImage,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Exclude<CategoryType, 'all'>>('nature');
  const [prompt, setPrompt] = useState('');
  const [author, setAuthor] = useState('');
  const [customKeyword, setCustomKeyword] = useState('');
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [useCustomKeyword, setUseCustomKeyword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !prompt.trim()) return;

    // Build the final photographic item
    let imageUrl = '';
    let cameraSettings = { aperture: 'f/4.0', shutterSpeed: '1/250s', iso: '100', lens: 'FE 24-105mm G OSS' };

    if (useCustomKeyword && customKeyword.trim()) {
      // Dynamic high-res Unsplash search endpoint to render spectacular matching visual
      const cleanKeywords = `${category},${customKeyword.trim().replace(/\s+/g, ',')}`;
      imageUrl = `https://images.unsplash.com/featured/1200x1500/?${encodeURIComponent(cleanKeywords)}`;
    } else {
      const preset = PHOTO_STYLE_PRESETS[selectedPresetIndex];
      imageUrl = preset.url;
      cameraSettings = preset.camera;
    }

    const finalAuthor = author.trim() || 'Abdishakur Creator';

    const newImageItem: ImageItem = {
      id: `custom_${Date.now()}`,
      category,
      title: title.trim(),
      prompt: prompt.trim(),
      url: imageUrl,
      author: finalAuthor,
      likes: 0,
      isLiked: false,
      cameraSettings,
      createdAt: new Date().toISOString()
    };

    onAddImage(newImageItem);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle('');
    setCategory('nature');
    setPrompt('');
    setAuthor('');
    setCustomKeyword('');
    setSelectedPresetIndex(0);
    setUseCustomKeyword(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      {/* Container */}
      <div className="relative max-w-2xl w-full bg-surface-container border border-outline-variant/20 rounded-2xl shadow-2xl overflow-hidden select-none animate-slide-up my-8">
        {/* Header decoration */}
        <div className="bg-surface-container-high px-6 py-5 border-b border-outline-variant/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <h3 className="font-headline font-bold text-lg text-white">Create Fine Art Artifact</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white bg-white/5 hover:bg-white/10 p-1.5 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form Submission */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Grid Layout fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Title field */}
            <div className="space-y-1.5">
              <label className="text-xs text-on-surface-variant font-mono uppercase tracking-wider block flex items-center gap-1">
                <Camera className="w-3.5 h-3.5 text-primary/70" /> Artwork Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Amber Forest Reflection"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary/60 transition-colors"
              />
            </div>

            {/* Category selection */}
            <div className="space-y-1.5">
              <label className="text-xs text-on-surface-variant font-mono uppercase tracking-wider block flex items-center gap-1">
                <Image className="w-3.5 h-3.5 text-primary/70" /> Landscape Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Exclude<CategoryType, 'all'>)}
                className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary/60 transition-colors cursor-pointer"
              >
                <option value="nature">Nature</option>
                <option value="animals">Animals</option>
                <option value="cities">Cities</option>
                <option value="technology">Technology</option>
              </select>
            </div>
          </div>

          {/* Author/Photographer field */}
          <div className="space-y-1.5">
            <label className="text-xs text-on-surface-variant font-mono uppercase tracking-wider block flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-primary/70" /> Photographer / Artisan Credit
            </label>
            <input
              type="text"
              placeholder="e.g. Julian Wilde (or leave blank to assign Abdishakur Creator)"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary/60 transition-colors"
            />
          </div>

          {/* Cinematic prompt directives */}
          <div className="space-y-1.5">
            <label className="text-xs text-on-surface-variant font-mono uppercase tracking-wider block flex items-center gap-1">
              <AlignLeft className="w-3.5 h-3.5 text-primary/70" /> Cinematic Prompt & Sensory Directives
            </label>
            <textarea
              required
              rows={3}
              placeholder="Provide a detailed visual prompt of your image (e.g. A gorgeous ultra-detailed long exposure of flowing water amidst ancient monolithic ruins at midnight, illuminated by ambient golden lanterns...)"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary/60 placeholder:text-white/30 transition-colors leading-relaxed"
            />
          </div>

          {/* Visual Source Selector (Presets vs. Custom search keyword) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-t border-outline-variant/10 pt-4">
              <span className="text-xs text-on-surface-variant font-mono uppercase tracking-wider block">
                VISUAL RENDER CONFIG
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setUseCustomKeyword(false)}
                  className={`text-[11px] font-mono uppercase px-2.5 py-1 rounded-md transition-all ${
                    !useCustomKeyword
                      ? 'bg-primary/10 text-primary border border-primary/25'
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  Presets
                </button>
                <button
                  type="button"
                  onClick={() => setUseCustomKeyword(true)}
                  className={`text-[11px] font-mono uppercase px-2.5 py-1 rounded-md transition-all ${
                    useCustomKeyword
                      ? 'bg-primary/10 text-primary border border-primary/25'
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  custom search
                </button>
              </div>
            </div>

            {/* PRESETS selector */}
            {!useCustomKeyword ? (
              <div className="space-y-3">
                <span className="text-xs text-white/50 block">Select a pre-curated high-resolution visual anchor:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PHOTO_STYLE_PRESETS.map((preset, index) => {
                    const isSelected = selectedPresetIndex === index;
                    return (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => setSelectedPresetIndex(index)}
                        className={`flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all duration-300 ${
                          isSelected
                            ? 'bg-primary/5 border-primary text-white shadow-md'
                            : 'bg-surface-container-low border-outline-variant/10 text-white/60 hover:text-white hover:border-white/20'
                        }`}
                      >
                        <img
                          src={preset.url}
                          alt={preset.name}
                          className="w-12 h-12 rounded-lg object-cover shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <span className="text-xs font-semibold block truncate">{preset.name}</span>
                          <span className="text-[10px] text-white/40 font-mono block truncate mt-0.5">
                            {preset.camera.lens}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* CUSTOM KEYWORDS block */
              <div className="space-y-2 animate-fade-in">
                <span className="text-xs text-white/50 block">Enter search keywords (e.g., "aurora, cabin, lake" or "tiger, close, eye"):</span>
                <input
                  type="text"
                  placeholder="e.g. volcanic black sand, golden sunset"
                  value={customKeyword}
                  onChange={(e) => setCustomKeyword(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary/60 transition-colors"
                />
                <span className="text-[10px] text-on-surface-variant font-mono block leading-normal">
                  * Note: Abdishakur automatically binds your photographic keywords to obtain an ultra-grade high-contrast Unsplash artwork fit for the gallery frame.
                </span>
              </div>
            )}
          </div>

          {/* Form Action Buttons */}
          <div className="flex gap-3 justify-end pt-4 border-t border-outline-variant/10">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-body-md text-white/70 hover:text-white bg-white/5 hover:bg-white/10 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-body-md font-bold text-black bg-primary hover:bg-primary-container hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 shadow-md shadow-primary/10"
            >
              <CheckCircle2 className="w-4 h-4" /> Render & Mount
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
