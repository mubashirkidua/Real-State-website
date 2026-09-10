import React, { useState, useEffect } from 'react';
import { Property } from '../types';
import { MapPin, Bed, Bath, Maximize2, Calendar, Eye, Edit3, Trash2, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getPropertyImageDetails } from '../utils/propertyImages';

interface PropertyCardProps {
  property: Property;
  onViewDetails: (property: Property) => void;
  onBookViewing: (property: Property) => void;
  onEdit?: (property: Property) => void;
  onDelete?: (propertyId: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onViewDetails,
  onBookViewing,
  onEdit,
  onDelete
}) => {
  const { user } = useAuth();
  const isOwner = user && (user.uid === property.sellerId || user.email === property.sellerEmail);

  // 8 to 10 image details per property
  const imageDetails = getPropertyImageDetails(property);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const currentDetail = imageDetails[currentImgIdx] || imageDetails[0];

  // Auto-rotate image every 4 seconds
  useEffect(() => {
    if (imageDetails.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentImgIdx((prev) => (prev + 1) % imageDetails.length);
    }, 4000); // 4-second rotation interval

    return () => clearInterval(timer);
  }, [imageDetails.length]);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev - 1 + imageDetails.length) % imageDetails.length);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev + 1) % imageDetails.length);
  };

  return (
    <div 
      className="group bg-[#0F1722] rounded-2xl border border-white/10 hover:border-[#C6A46A]/50 transition-all duration-300 overflow-hidden flex flex-col shadow-lg hover:shadow-2xl hover:shadow-[#C6A46A]/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Badges & 4s Carousel */}
      <div 
        className="relative h-64 overflow-hidden bg-black/40 cursor-pointer"
        onClick={() => onViewDetails(property)}
      >
        {/* Render all 8-10 images with seamless cross-fade */}
        {imageDetails.map((detail, idx) => (
          <img
            key={`${property.id}-img-${idx}`}
            src={detail.url}
            alt={`${property.title} - ${detail.title}`}
            referrerPolicy="no-referrer"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
              idx === currentImgIdx ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0 pointer-events-none'
            }`}
            loading="lazy"
          />
        ))}

        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#0F1722] via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase backdrop-blur-md shadow-sm ${
            property.category === 'House'
              ? 'bg-[#B89354] text-[#0A1118]'
              : property.category === 'Apartment'
              ? 'bg-sky-500/90 text-white'
              : 'bg-emerald-600/90 text-white'
          }`}>
            {property.category}
          </span>
          {property.status === 'sold' && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-rose-600/90 text-white backdrop-blur-md shadow-sm">
              Sold
            </span>
          )}
          {property.status === 'under_offer' && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500/90 text-slate-950 backdrop-blur-md shadow-sm">
              Under Offer
            </span>
          )}
          {property.isFeatured && property.status !== 'sold' && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-white/20 text-white backdrop-blur-md">
              Featured
            </span>
          )}
        </div>

        {/* Current Image Room/Area Badge */}
        <div className="absolute top-12 left-3.5 right-3.5 z-20 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0A1118]/85 border border-[#C6A46A]/40 backdrop-blur-md shadow-md max-w-[85%]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A46A] shrink-0 animate-pulse" />
            <span className="text-[11px] font-semibold text-[#E3C594] truncate">
              {currentDetail.title}
            </span>
          </div>
        </div>

        {/* Top Right: Image counter badge (e.g. 1/10) */}
        <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider bg-[#0A1118]/80 text-[#E3C594] border border-[#C6A46A]/30 backdrop-blur-md">
            {currentImgIdx + 1} / {imageDetails.length}
          </span>

          {/* Owner Controls Badge if owner */}
          {isOwner && (
            <div className="flex items-center gap-1 bg-[#0A1118]/85 backdrop-blur-md p-0.5 rounded-xl border border-[#C6A46A]/40">
              {onEdit && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(property);
                  }}
                  title="Edit Property"
                  className="p-1.5 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(property.id);
                  }}
                  title="Delete Property"
                  className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/20 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Hover Navigation Arrows */}
        <div className="absolute inset-y-0 left-2 right-2 z-20 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handlePrevImage}
            aria-label="Previous image"
            className="p-1.5 rounded-full bg-[#0A1118]/80 hover:bg-[#C6A46A] text-white hover:text-[#0A1118] transition pointer-events-auto border border-white/20 backdrop-blur-md shadow-md"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNextImage}
            aria-label="Next image"
            className="p-1.5 rounded-full bg-[#0A1118]/80 hover:bg-[#C6A46A] text-white hover:text-[#0A1118] transition pointer-events-auto border border-white/20 backdrop-blur-md shadow-md"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Price Pill & Indicator Dots */}
        <div className="absolute bottom-3 left-3.5 right-3.5 z-20 flex items-end justify-between">
          <span className="font-cinzel text-xl font-bold text-white drop-shadow-md">
            ${property.price.toLocaleString()}
          </span>

          {/* 8-10 mini dots */}
          <div className="flex items-center gap-1 bg-[#0A1118]/75 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10">
            {imageDetails.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImgIdx(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentImgIdx ? 'w-4 bg-[#C6A46A]' : 'w-1.5 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Jump to image ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 
            onClick={() => onViewDetails(property)}
            className="font-cinzel text-lg font-bold text-white group-hover:text-[#E3C594] transition cursor-pointer line-clamp-1"
          >
            {property.title}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1 mb-2.5">
            <MapPin className="w-3.5 h-3.5 text-[#C6A46A] shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Dynamic Image Detail Box (Changes every 4 seconds with active photo) */}
          <div className="mb-3 p-2.5 rounded-xl bg-[#090E16]/90 border border-[#C6A46A]/20 transition-all duration-500 hover:border-[#C6A46A]/40">
            <div className="flex items-center justify-between text-[10px] text-[#C6A46A] font-semibold uppercase tracking-wider mb-1">
              <span className="flex items-center gap-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6A46A]" />
                View {currentImgIdx + 1}/{imageDetails.length}: {currentDetail.tag}
              </span>
              <span className="text-slate-400 font-normal shrink-0 ml-2">
                {currentDetail.dimensions || currentDetail.highlight}
              </span>
            </div>
            <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed italic">
              "{currentDetail.description}"
            </p>
          </div>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
            {property.description}
          </p>
        </div>

        {/* Specs Row */}
        <div>
          <div className="grid grid-cols-3 gap-2 py-3 px-2 rounded-xl bg-[#090E16] border border-white/5 text-center text-xs text-slate-300 mb-4">
            {property.category === 'Plot' ? (
              <>
                <div className="col-span-2 flex items-center justify-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-[#C6A46A]" />
                  <span>{property.areaSqft.toLocaleString()} sq ft</span>
                </div>
                <div className="flex items-center justify-center text-emerald-400 font-medium">
                  Zoned Res.
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center gap-1">
                  <Bed className="w-3.5 h-3.5 text-[#C6A46A]" />
                  <span>{property.bedrooms} Beds</span>
                </div>
                <div className="flex items-center justify-center gap-1 border-x border-white/10">
                  <Bath className="w-3.5 h-3.5 text-[#C6A46A]" />
                  <span>{property.bathrooms} Baths</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Maximize2 className="w-3.5 h-3.5 text-[#C6A46A]" />
                  <span>{property.areaSqft.toLocaleString()} sf</span>
                </div>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => onViewDetails(property)}
              className="w-full py-2.5 px-3 rounded-xl border border-white/15 hover:border-[#C6A46A]/60 bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold tracking-wider uppercase transition flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Details</span>
            </button>

            <button
              onClick={() => onBookViewing(property)}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#B89354] to-[#C6A46A] hover:from-[#C6A46A] hover:to-[#D8B77E] text-[#0A1118] text-xs font-bold tracking-wider uppercase shadow-md shadow-[#C6A46A]/20 transition flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Viewing</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
