import React, { useState, useEffect } from 'react';
import { Property } from '../types';
import { X, MapPin, Bed, Bath, Maximize2, Calendar, Phone, Mail, CheckCircle2, ShieldCheck, Share2, Edit3, Trash2, ChevronLeft, ChevronRight, Layers, Sparkles, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getPropertyImageDetails } from '../utils/propertyImages';

interface PropertyDetailsModalProps {
  property: Property | null;
  onClose: () => void;
  onBookViewing: (property: Property) => void;
  onEdit?: (property: Property) => void;
  onDelete?: (propertyId: string) => void;
}

export const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({
  property,
  onClose,
  onBookViewing,
  onEdit,
  onDelete
}) => {
  const { user } = useAuth();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // 8 to 10 image details per property
  const imageDetails = property ? getPropertyImageDetails(property) : [];
  const activeDetail = imageDetails[activeImageIndex] || imageDetails[0];

  // Reset index when property changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [property?.id]);

  // 4-second auto-rotation
  useEffect(() => {
    if (!property || imageDetails.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % imageDetails.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [property, imageDetails.length, isPaused]);

  if (!property) return null;

  const isOwner = user && (user.uid === property.sellerId || user.email === property.sellerEmail);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + imageDetails.length) % imageDetails.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % imageDetails.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-[#0F1722] border border-[#C6A46A]/30 rounded-2xl shadow-2xl overflow-hidden text-slate-100 my-8 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-[#0A1118]/80 hover:bg-[#0A1118] text-slate-300 hover:text-white border border-white/20 backdrop-blur-md transition shadow-lg"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery / Image Carousel with 4s Auto-Rotation */}
        <div className="relative h-72 sm:h-96 w-full bg-black/60 overflow-hidden shrink-0">
          {imageDetails.map((detail, idx) => (
            <img
              key={idx}
              src={detail.url}
              alt={`${property.title} - ${detail.title}`}
              referrerPolicy="no-referrer"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                idx === activeImageIndex ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0 pointer-events-none'
              }`}
            />
          ))}
          <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#0F1722] via-transparent to-black/40" />

          {/* Badges & Auto-play indicator */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#C6A46A] text-[#0A1118] shadow-md">
              {property.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#0A1118]/80 text-slate-200 border border-white/10 backdrop-blur-md">
              Verified Listing
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#0A1118]/80 text-[#C6A46A] border border-[#C6A46A]/30 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A46A] animate-ping" />
              {isPaused ? 'Paused' : '4s Auto'}
            </span>
          </div>

          {/* Active Photo Floating Badge */}
          {activeDetail && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 max-w-[80%] pointer-events-none text-center hidden md:block">
              <div className="px-4 py-1.5 rounded-full bg-[#0A1118]/85 border border-[#C6A46A]/40 backdrop-blur-md shadow-lg inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C6A46A] animate-pulse" />
                <span className="text-xs font-semibold text-white truncate">
                  {activeDetail.title}
                </span>
                <span className="text-[10px] uppercase font-bold text-[#E3C594] border-l border-white/20 pl-2">
                  {activeDetail.tag}
                </span>
              </div>
            </div>
          )}

          {/* Manual Left/Right Navigation Chevrons */}
          <div className="absolute inset-y-0 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-[#0A1118]/80 hover:bg-[#C6A46A] text-white hover:text-[#0A1118] transition pointer-events-auto border border-white/20 backdrop-blur-md shadow-lg"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-[#0A1118]/80 hover:bg-[#C6A46A] text-white hover:text-[#0A1118] transition pointer-events-auto border border-white/20 backdrop-blur-md shadow-lg"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Top Counter */}
          <div className="absolute top-4 right-16 z-20">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#0A1118]/80 text-[#E3C594] border border-[#C6A46A]/30 backdrop-blur-md">
              {activeImageIndex + 1} / {imageDetails.length}
            </span>
          </div>

          {/* 8-10 Thumbnails row in circle shape */}
          {imageDetails.length > 1 && (
            <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
              {imageDetails.map((detail, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  title={`${detail.title} (${idx + 1})`}
                  className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden shrink-0 border-2 transition-all shadow-lg ${
                    activeImageIndex === idx ? 'border-[#C6A46A] scale-110 ring-2 ring-[#C6A46A]/50' : 'border-white/40 opacity-70 hover:opacity-100 hover:scale-105'
                  }`}
                  aria-label={`Select photo ${idx + 1}`}
                >
                  <img src={detail.url} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover rounded-full" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Details Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
          {/* Header Row: Title & Price */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mb-2">
                {property.title}
              </h2>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <MapPin className="w-4 h-4 text-[#C6A46A] shrink-0" />
                <span>{property.location}</span>
              </div>
            </div>

            <div className="sm:text-right">
              <span className="text-xs uppercase tracking-widest text-slate-400 block mb-0.5">
                Offering Price
              </span>
              <span className="font-cinzel text-3xl sm:text-4xl font-bold text-[#E3C594]">
                ${property.price.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Dedicated Active Image Photographic Detail Panel */}
          {activeDetail && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#101924] via-[#0D1520] to-[#101924] border border-[#C6A46A]/40 shadow-xl relative overflow-hidden transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#C6A46A]/20 border border-[#C6A46A]/40 flex items-center justify-center text-[#E3C594] font-cinzel font-bold text-sm">
                    {activeImageIndex + 1}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#C6A46A] font-bold block">
                      Active Photo Study • {activeDetail.tag}
                    </span>
                    <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white">
                      {activeDetail.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[#E3C594] font-medium">
                    {activeDetail.highlight}
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-200 mt-3 leading-relaxed">
                {activeDetail.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-3 border-t border-white/10 text-xs">
                {activeDetail.materials && (
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Materials:</span>
                    <span className="text-white truncate">{activeDetail.materials}</span>
                  </div>
                )}
                {activeDetail.dimensions && (
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Specifications:</span>
                    <span className="text-[#E3C594] truncate">{activeDetail.dimensions}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Key Specs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#090E16] border border-white/10 text-center">
            {property.category === 'Plot' ? (
              <>
                <div className="p-2">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">Lot Size</span>
                  <div className="flex items-center justify-center gap-1.5 font-cinzel text-lg font-bold text-white">
                    <Maximize2 className="w-4 h-4 text-[#C6A46A]" />
                    <span>{property.areaSqft.toLocaleString()} sq ft</span>
                  </div>
                </div>
                <div className="p-2">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">Acreage</span>
                  <span className="font-cinzel text-lg font-bold text-[#E3C594]">
                    {(property.areaSqft / 43560).toFixed(2)} Acres
                  </span>
                </div>
                <div className="p-2">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">Zoning</span>
                  <span className="text-sm font-semibold text-emerald-400">Custom Residential</span>
                </div>
                <div className="p-2">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">Utilities</span>
                  <span className="text-sm font-semibold text-slate-200">Serviced / Ready</span>
                </div>
              </>
            ) : (
              <>
                <div className="p-2">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">Bedrooms</span>
                  <div className="flex items-center justify-center gap-1.5 font-cinzel text-lg font-bold text-white">
                    <Bed className="w-4 h-4 text-[#C6A46A]" />
                    <span>{property.bedrooms} Beds</span>
                  </div>
                </div>
                <div className="p-2 border-l border-white/10">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">Bathrooms</span>
                  <div className="flex items-center justify-center gap-1.5 font-cinzel text-lg font-bold text-white">
                    <Bath className="w-4 h-4 text-[#C6A46A]" />
                    <span>{property.bathrooms} Baths</span>
                  </div>
                </div>
                <div className="p-2 border-l border-white/10">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">Living Space</span>
                  <div className="flex items-center justify-center gap-1.5 font-cinzel text-lg font-bold text-white">
                    <Maximize2 className="w-4 h-4 text-[#C6A46A]" />
                    <span>{property.areaSqft.toLocaleString()} sf</span>
                  </div>
                </div>
                <div className="p-2 border-l border-white/10">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">Category</span>
                  <span className="font-cinzel text-lg font-bold text-[#E3C594]">
                    {property.category}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* All 10 Spaces Photographic Navigator Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#C6A46A]" />
                <span>All Spaces & Visual Perspectives ({imageDetails.length} Unique Details)</span>
              </h4>
              <span className="text-[11px] text-slate-400 hidden sm:inline">Click any space to inspect photo & detail</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {imageDetails.map((detail, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-3.5 ${
                    activeImageIndex === idx
                      ? 'bg-[#C6A46A]/15 border-[#C6A46A] shadow-md shadow-[#C6A46A]/10'
                      : 'bg-[#090E16] border-white/5 hover:border-white/20 hover:bg-white/5'
                  }`}
                >
                  {/* Circular shape photo for the 10 spaces */}
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shrink-0 border-2 border-[#C6A46A]/60 shadow-md ring-2 ring-black/50">
                    <img
                      src={detail.url}
                      alt={detail.title}
                      className="w-full h-full object-cover rounded-full"
                    />
                    <span className="absolute bottom-0 right-0 w-4 h-4 text-[9px] font-bold bg-[#C6A46A] text-[#0A1118] rounded-full flex items-center justify-center shadow">
                      {idx + 1}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                      <span className="uppercase font-semibold text-[#C6A46A]">View 0{idx + 1}</span>
                      <span className="truncate ml-1">{detail.tag}</span>
                    </div>
                    <h5 className="text-xs font-bold text-white truncate">
                      {detail.title}
                    </h5>
                    <p className="text-[11px] text-slate-300 truncate mt-0.5">
                      {detail.highlight}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-cinzel text-base font-bold text-white mb-2 uppercase tracking-wider">
              Complete Property Architecture & Overview
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Features / Amenities */}
          {property.features && property.features.length > 0 && (
            <div>
              <h4 className="font-cinzel text-base font-bold text-white mb-3 uppercase tracking-wider">
                Key Features & Finishes
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {property.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-200 p-2.5 rounded-lg bg-white/5 border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-[#C6A46A] shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Seller / Representative Information */}
          <div className="p-5 rounded-xl bg-[#090E16] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#C6A46A]/20 border border-[#C6A46A]/40 flex items-center justify-center text-[#E3C594] font-cinzel font-bold text-lg">
                {(property.sellerName || 'The Ocean Real State')[0]}
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C6A46A] font-semibold block">
                  Property Representative
                </span>
                <h5 className="font-medium text-white text-sm">
                  {property.sellerName || 'The Ocean Real State'}
                </h5>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                  {property.sellerPhone && (
                    <a
                      href={`tel:${property.sellerPhone.replace(/[^0-9+]/g, '')}`}
                      className="flex items-center gap-1 text-slate-300 hover:text-[#E3C594] transition"
                      title="Call Representative"
                    >
                      <Phone className="w-3 h-3 text-[#C6A46A]" />
                      <span>{property.sellerPhone}</span>
                    </a>
                  )}
                  {property.sellerEmail && (
                    <a
                      href={`mailto:${property.sellerEmail}?subject=Inquiry%20regarding%20${encodeURIComponent(property.title)}`}
                      className="flex items-center gap-1 text-slate-300 hover:text-[#E3C594] transition"
                      title="Email Representative"
                    >
                      <Mail className="w-3 h-3 text-[#C6A46A]" />
                      <span>{property.sellerEmail}</span>
                    </a>
                  )}
                  <a
                    href={`https://wa.me/923428156086?text=${encodeURIComponent(`Hello Muhammad Mubashir Ali, I am inquiring about the property: ${property.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition font-medium"
                    title="WhatsApp CEO"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleShare}
                className="p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition"
                title="Copy Link"
              >
                <Share2 className="w-4 h-4" />
              </button>
              {copiedLink && (
                <span className="text-xs text-[#E3C594]">Link copied!</span>
              )}
            </div>
          </div>

          {/* Owner Actions if owner */}
          {isOwner && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-amber-300">
                <ShieldCheck className="w-4 h-4" />
                <span>You own this property listing.</span>
              </div>
              <div className="flex items-center gap-2">
                {onEdit && (
                  <button
                    onClick={() => { onClose(); onEdit(property); }}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Listing</span>
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => { onClose(); onDelete(property.id); }}
                    className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Listing</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Booking Action Footer */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs text-slate-400">
                Private in-person & architectural virtual walkthroughs available daily.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onBookViewing(property);
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#B89354] to-[#C6A46A] hover:from-[#C6A46A] hover:to-[#D8B77E] text-[#0A1118] font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-[#C6A46A]/20 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Private Viewing</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

