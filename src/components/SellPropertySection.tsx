import React, { useState, useEffect } from 'react';
import { Property, PropertyCategory } from '../types';
import { useAuth } from '../context/AuthContext';
import { createProperty, editProperty } from '../lib/firebase';
import { PRESET_IMAGE_SUGGESTIONS } from '../data/initialProperties';
import { getPropertyImages } from '../utils/propertyImages';
import {
  Upload,
  Image as ImageIcon,
  DollarSign,
  MapPin,
  Home,
  Bed,
  Bath,
  Maximize2,
  FileText,
  Sparkles,
  Check,
  AlertCircle,
  Loader2,
  ArrowLeft
} from 'lucide-react';

interface SellPropertySectionProps {
  editingProperty: Property | null;
  onDone: () => void;
  onCancel: () => void;
}

const COMMON_AMENITIES = [
  'Swimming Pool',
  'Private Elevator',
  'Chef Kitchen',
  'Smart Home Automation',
  'Balcony / Terrace',
  'Heated Garage',
  'Wine Cellar',
  'Panoramic Mountain View',
  'Floor-to-Ceiling Windows',
  'Waterfront Access'
];

export const SellPropertySection: React.FC<SellPropertySectionProps> = ({
  editingProperty,
  onDone,
  onCancel
}) => {
  const { user, openAuthModal } = useAuth();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<PropertyCategory>('House');
  const [price, setPrice] = useState<number | ''>('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [bedrooms, setBedrooms] = useState<number>(3);
  const [bathrooms, setBathrooms] = useState<number>(3);
  const [areaSqft, setAreaSqft] = useState<number | ''>(2800);
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState<string[]>([
    'Smart Home Automation',
    'Floor-to-Ceiling Windows'
  ]);
  const [customFeature, setCustomFeature] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize if in editing mode
  useEffect(() => {
    if (editingProperty) {
      setTitle(editingProperty.title);
      setCategory(editingProperty.category);
      setPrice(editingProperty.price);
      setLocation(editingProperty.location);
      setImageUrl(editingProperty.imageUrl);
      setBedrooms(editingProperty.bedrooms);
      setBathrooms(editingProperty.bathrooms);
      setAreaSqft(editingProperty.areaSqft);
      setDescription(editingProperty.description);
      setFeatures(editingProperty.features || []);
    } else {
      // Default initial luxury preset image
      setImageUrl(PRESET_IMAGE_SUGGESTIONS[0].url);
    }
  }, [editingProperty]);

  // Handle local file upload (converted to data URL)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      setError('Image file size exceeds 4MB limit. Please choose a smaller file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const toggleFeature = (feat: string) => {
    if (features.includes(feat)) {
      setFeatures(features.filter((f) => f !== feat));
    } else {
      setFeatures([...features, feat]);
    }
  };

  const handleAddCustomFeature = () => {
    if (customFeature.trim() && !features.includes(customFeature.trim())) {
      setFeatures([...features, customFeature.trim()]);
      setCustomFeature('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!user) {
      openAuthModal('signin');
      return;
    }

    if (!title.trim()) {
      setError('Please provide a property title or name');
      return;
    }

    if (!price || Number(price) <= 0) {
      setError('Please enter a valid price');
      return;
    }

    if (!location.trim()) {
      setError('Please enter the property location');
      return;
    }

    if (!imageUrl.trim()) {
      setError('Please provide a valid property image');
      return;
    }

    if (!description.trim()) {
      setError('Please provide an architectural description');
      return;
    }

    setIsSubmitting(true);
    try {
      const fullGallery = getPropertyImages({
        id: editingProperty?.id || 'temp',
        title: title.trim(),
        category,
        price: Number(price),
        location: location.trim(),
        imageUrl: imageUrl.trim(),
        gallery: editingProperty?.gallery || [imageUrl.trim()],
        bedrooms: category === 'Plot' ? 0 : Number(bedrooms),
        bathrooms: category === 'Plot' ? 0 : Number(bathrooms),
        areaSqft: Number(areaSqft) || 1000,
        description: description.trim(),
        features,
        sellerId: user.uid,
        sellerName: user.displayName || user.email?.split('@')[0] || 'Property Owner',
        sellerEmail: user.email || '',
        createdAt: Date.now()
      });

      if (editingProperty) {
        // Edit existing
        await editProperty(editingProperty.id, {
          title: title.trim(),
          category,
          price: Number(price),
          location: location.trim(),
          imageUrl: imageUrl.trim(),
          gallery: fullGallery,
          bedrooms: category === 'Plot' ? 0 : Number(bedrooms),
          bathrooms: category === 'Plot' ? 0 : Number(bathrooms),
          areaSqft: Number(areaSqft) || 1000,
          description: description.trim(),
          features
        });
      } else {
        // Create new
        const newProperty: Omit<Property, 'id'> = {
          title: title.trim(),
          category,
          price: Number(price),
          location: location.trim(),
          imageUrl: imageUrl.trim(),
          gallery: fullGallery,
          bedrooms: category === 'Plot' ? 0 : Number(bedrooms),
          bathrooms: category === 'Plot' ? 0 : Number(bathrooms),
          areaSqft: Number(areaSqft) || 1000,
          description: description.trim(),
          features,
          sellerId: user.uid,
          sellerName: user.displayName || user.email?.split('@')[0] || 'Property Owner',
          sellerEmail: user.email || '',
          sellerPhone: user.phoneNumber || '403.555.0199',
          createdAt: Date.now(),
          isFeatured: false
        };

        await createProperty(newProperty);
      }

      onDone();
    } catch (err: any) {
      console.error('Save property error:', err);
      setError(err.message || 'Failed to save property listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 animate-fade-in text-slate-100">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition"
            aria-label="Back to listings"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6A46A] font-bold block">
              {editingProperty ? 'Modify Listing' : 'Property Submission'}
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
              {editingProperty ? 'Edit Your Property' : 'List a Property for Sale'}
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="text-xs text-slate-400 hover:text-white"
        >
          Cancel
        </button>
      </div>

      {!user && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>You must be signed in to submit and manage property listings.</span>
          <button
            type="button"
            onClick={() => openAuthModal('signin')}
            className="px-4 py-2 rounded-lg bg-[#C6A46A] text-[#0A1118] text-xs font-bold uppercase tracking-wider"
          >
            Sign In Now
          </button>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm mb-6 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Basic Information */}
        <div className="p-6 rounded-2xl bg-[#0F1722] border border-white/10 space-y-5">
          <h3 className="font-cinzel text-lg font-bold text-white flex items-center gap-2">
            <Home className="w-4 h-4 text-[#C6A46A]" />
            <span>General Details</span>
          </h3>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Property Title / Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. The Crestview Modern Pavilion"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-[#080D14] border border-white/15 focus:border-[#C6A46A] focus:outline-none rounded-xl text-sm text-white placeholder-slate-500 transition"
            />
          </div>

          {/* Category Selector (House, Apartment, Plot) */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">
              Property Category *
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['House', 'Apartment', 'Plot'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`py-3 px-4 rounded-xl text-sm font-semibold transition border ${
                    category === cat
                      ? 'bg-[#C6A46A] text-[#0A1118] border-[#C6A46A] shadow-md shadow-[#C6A46A]/20'
                      : 'bg-[#080D14] text-slate-300 border-white/15 hover:border-white/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-[#C6A46A]" />
                Price in USD ($) *
              </label>
              <input
                type="number"
                required
                min="1000"
                step="5000"
                placeholder="e.g. 1750000"
                value={price}
                onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-4 py-3 bg-[#080D14] border border-white/15 focus:border-[#C6A46A] focus:outline-none rounded-xl text-sm text-white placeholder-slate-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#C6A46A]" />
                Location / Address *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 428 Aspen Ridge Drive, Calgary, AB"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 bg-[#080D14] border border-white/15 focus:border-[#C6A46A] focus:outline-none rounded-xl text-sm text-white placeholder-slate-500 transition"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Property Image */}
        <div className="p-6 rounded-2xl bg-[#0F1722] border border-white/10 space-y-5">
          <h3 className="font-cinzel text-lg font-bold text-white flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[#C6A46A]" />
            <span>Property Photography</span>
          </h3>

          {/* Current Preview */}
          {imageUrl && (
            <div className="relative h-56 rounded-xl overflow-hidden border border-[#C6A46A]/30 bg-black/40">
              <img
                src={imageUrl}
                alt="Listing preview"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-[#0A1118]/80 backdrop-blur-md text-[11px] text-white font-medium border border-white/10">
                Current Image Preview
              </span>
            </div>
          )}

          {/* Image URL input */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Image URL *
            </label>
            <input
              type="url"
              required
              placeholder="https://images.unsplash.com/..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-3 bg-[#080D14] border border-white/15 focus:border-[#C6A46A] focus:outline-none rounded-xl text-sm text-white placeholder-slate-500 transition"
            />
          </div>

          {/* Local file upload or preset selection */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <label className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 cursor-pointer flex items-center justify-center gap-2 transition">
              <Upload className="w-4 h-4 text-[#C6A46A]" />
              <span>Upload from Computer</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <span className="text-xs text-slate-400">or pick from luxury architecture presets below:</span>
          </div>

          {/* Presets Gallery */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            {PRESET_IMAGE_SUGGESTIONS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setImageUrl(preset.url)}
                className={`group relative h-20 rounded-lg overflow-hidden border-2 transition text-left ${
                  imageUrl === preset.url ? 'border-[#C6A46A] scale-102' : 'border-white/10 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={preset.url}
                  alt={preset.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition flex items-end p-1.5">
                  <span className="text-[10px] text-white font-medium truncate drop-shadow">
                    {preset.title}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Section 3: Specifications & Description */}
        <div className="p-6 rounded-2xl bg-[#0F1722] border border-white/10 space-y-5">
          <h3 className="font-cinzel text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#C6A46A]" />
            <span>Specifications & Details</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {category !== 'Plot' && (
              <>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1">
                    <Bed className="w-3.5 h-3.5 text-[#C6A46A]" />
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-[#080D14] border border-white/15 focus:border-[#C6A46A] focus:outline-none rounded-xl text-sm text-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1">
                    <Bath className="w-3.5 h-3.5 text-[#C6A46A]" />
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    step="0.5"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-[#080D14] border border-white/15 focus:border-[#C6A46A] focus:outline-none rounded-xl text-sm text-white transition"
                  />
                </div>
              </>
            )}

            <div className={category === 'Plot' ? 'sm:col-span-3' : ''}>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1">
                <Maximize2 className="w-3.5 h-3.5 text-[#C6A46A]" />
                {category === 'Plot' ? 'Plot / Land Area (Sq Ft) *' : 'Living Area (Sq Ft) *'}
              </label>
              <input
                type="number"
                required
                min="100"
                step="50"
                placeholder="e.g. 3500"
                value={areaSqft}
                onChange={(e) => setAreaSqft(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-4 py-3 bg-[#080D14] border border-white/15 focus:border-[#C6A46A] focus:outline-none rounded-xl text-sm text-white transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Architectural Description *
            </label>
            <textarea
              rows={4}
              required
              placeholder="Describe the architectural design, natural lighting, materials, and overall ambiance..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-[#080D14] border border-white/15 focus:border-[#C6A46A] focus:outline-none rounded-xl text-sm text-white placeholder-slate-500 transition resize-y"
            />
          </div>

          {/* Features / Amenities selection */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A46A]" />
              Features & Amenities
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {COMMON_AMENITIES.map((amenity) => {
                const isSelected = features.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleFeature(amenity)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#C6A46A] text-[#0A1118] font-semibold'
                        : 'bg-[#080D14] text-slate-300 border border-white/15 hover:border-white/30'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                    <span>{amenity}</span>
                  </button>
                );
              })}
            </div>

            {/* Add Custom Amenity Tag */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Add custom feature (e.g. Japanese Courtyard)..."
                value={customFeature}
                onChange={(e) => setCustomFeature(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomFeature();
                  }
                }}
                className="px-3.5 py-2 bg-[#080D14] border border-white/15 focus:border-[#C6A46A] focus:outline-none rounded-xl text-xs text-white placeholder-slate-500 flex-1"
              />
              <button
                type="button"
                onClick={handleAddCustomFeature}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-slate-200 font-semibold"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-semibold transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#B89354] to-[#C6A46A] hover:from-[#C6A46A] hover:to-[#D8B77E] text-[#0A1118] font-bold text-sm tracking-wider uppercase shadow-xl shadow-[#C6A46A]/20 transition flex items-center gap-2 disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Publishing Listing...</span>
              </>
            ) : (
              <span>{editingProperty ? 'Update Listing' : 'Publish Property Listing'}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
