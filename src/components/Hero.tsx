import React, { useState, useEffect } from 'react';
import { PropertyCategory } from '../types';
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  Gem,
  Bed,
  Leaf,
  Lamp,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock
} from 'lucide-react';

interface HeroShowcaseHouse {
  id: string;
  title: string;
  location: string;
  specs: string;
  price: string;
  imageUrl: string;
  tag: string;
  description: string;
  highlight: string;
}

const HERO_HOUSES: HeroShowcaseHouse[] = [
  {
    id: 'hero-1',
    title: 'The Crestview Modern Pavilion',
    location: 'Aspen Ridge Estates',
    specs: '4 Bed • 5 Bath • 5,400 Sq Ft',
    price: '$2,850,000',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    tag: 'Featured Masterpiece',
    description: 'Cantilevered limestone pavilions with 22-ft soaring ceilings, integrated smart glass, and a zero-edge saline infinity pool.',
    highlight: 'Zero-Edge Saline Pool & 22ft Vaulted Great Room'
  },
  {
    id: 'hero-2',
    title: 'The Glass Horizon Estate',
    location: 'Beverly Hills Crest',
    specs: '5 Bed • 6 Bath • 6,200 Sq Ft',
    price: '$3,450,000',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    tag: 'Architectural Trophy',
    description: 'Ultra-modern glass curtain architecture offering 180-degree unobstructed Pacific ocean and metropolitan horizon vistas.',
    highlight: 'Floor-to-Ceiling Thermal Low-E Glass Walls'
  },
  {
    id: 'hero-3',
    title: 'Nordic Sanctuary Residence',
    location: 'Highland Woods',
    specs: '4 Bed • 4.5 Bath • 4,800 Sq Ft',
    price: '$2,490,000',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
    tag: 'Sustainable Luxury',
    description: 'Biophilic sanctuary framed in blackened cedar timber, honed basalt fireplaces, geothermal heating, and radiant oak floors.',
    highlight: 'Hand-Cut Basalt Hearth & Geothermal HVAC'
  },
  {
    id: 'hero-4',
    title: 'Villa Serena Cascades',
    location: 'Pacific Palisades',
    specs: '6 Bed • 7 Bath • 7,100 Sq Ft',
    price: '$4,200,000',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
    tag: 'Coastal Sanctuary',
    description: 'Private gated promontory featuring multi-tier cascading water terraces, outdoor chef kitchen, and private primary wellness wing.',
    highlight: 'Cascading Water Gardens & Private Wellness Wing'
  },
  {
    id: 'hero-5',
    title: 'The Cantilever Modern Manor',
    location: 'Silicon Foothills',
    specs: '5 Bed • 5 Bath • 5,900 Sq Ft',
    price: '$3,180,000',
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
    tag: 'Contemporary Design',
    description: 'Dramatic structural steel engineering with floating living volume, 800-bottle wine gallery, and motorized Fleetwood glass pocket doors.',
    highlight: '800-Bottle Glass Wine Vault & Pocketing Doors'
  },
  {
    id: 'hero-6',
    title: 'The Sunset Bel-Air Haven',
    location: 'Bel-Air Heights',
    specs: '5 Bed • 6 Bath • 6,400 Sq Ft',
    price: '$3,900,000',
    imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85',
    tag: 'Executive Living',
    description: 'Skylit central olive-tree atrium, limestone spa with cedar sauna, and cantilevered sunset deck with panoramic twilight exposure.',
    highlight: 'Skylit Courtyard Atrium & Nordic Cedar Sauna'
  },
  {
    id: 'hero-7',
    title: 'Alpine Timber & Glass Lodge',
    location: 'Whistler Mountain Reserve',
    specs: '4 Bed • 4 Bath • 4,600 Sq Ft',
    price: '$2,650,000',
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=85',
    tag: 'Four-Season Haven',
    description: 'Heavy timber construction with oversized granite fireplace, radiant stone terrace, private ski equipment locker, and hot pool.',
    highlight: 'Massive Granite Fireplace & Heated Ski Room'
  },
  {
    id: 'hero-8',
    title: 'Minimalist Desert Oasis',
    location: 'Scottsdale Reserve',
    specs: '4 Bed • 5 Bath • 5,100 Sq Ft',
    price: '$2,950,000',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
    tag: 'Desert Modernism',
    description: 'Rammed-earth exterior walls paired with bronze louvers, private internal zen pebble garden, and lap pool reflecting desert peaks.',
    highlight: 'Rammed-Earth Massing & Zen Pebble Courtyard'
  },
  {
    id: 'hero-9',
    title: 'The Sovereign Waterfront Villa',
    location: 'Lakeview Promontory',
    specs: '6 Bed • 7 Bath • 8,200 Sq Ft',
    price: '$4,850,000',
    imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
    tag: 'Waterfront Estate',
    description: 'Direct deepwater lake access with private boat slip, two-story boathouse lounge, custom cinema theater, and lakeside fire pit.',
    highlight: 'Private Deepwater Boat Slip & 2-Story Boathouse'
  },
  {
    id: 'hero-10',
    title: 'The Lumina Contemporary Retreat',
    location: 'Oakwood Heights',
    specs: '4 Bed • 4 Bath • 4,950 Sq Ft',
    price: '$2,780,000',
    imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
    tag: 'Modern Elegance',
    description: 'Artisan hand-plastered walls, Calacatta marble chef kitchen with double prep islands, and a landscaped Japanese maple garden.',
    highlight: 'Double Calacatta Prep Islands & Japanese Garden'
  }
];

interface HeroProps {
  selectedCategory: PropertyCategory | 'All';
  setSelectedCategory: (cat: PropertyCategory | 'All') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  priceFilter: number;
  setPriceFilter: (price: number) => void;
  onExploreProperties: () => void;
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  priceFilter,
  setPriceFilter,
  onExploreProperties,
  onOpenConsultation,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate every 4 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_HOUSES.length);
    }, 4000); // 4-second rotation interval

    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + HERO_HOUSES.length) % HERO_HOUSES.length);
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % HERO_HOUSES.length);
  };

  const activeHouse = HERO_HOUSES[currentImageIndex];
  return (
    <section className="relative overflow-hidden bg-black/30 backdrop-blur-[1px] text-white">
      {/* Background Ambience / Subtle Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#C6A46A_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      {/* Main Top Section - Direct Reference Match */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Visionary Typography & Legacy Box */}
          <div className="lg:col-span-6 space-y-6">
            {/* Ocean Crest Emblem Header */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#C6A46A]/40 bg-[#C6A46A]/10 text-[#C6A46A]">
              <Sparkles className="w-3.5 h-3.5 text-[#E3C594]" />
              <span className="text-[11px] tracking-[0.25em] uppercase font-bold text-[#E3C594]">
                THE OCEAN REAL STATE
              </span>
            </div>

            {/* Headline matching Reference Image */}
            <div className="space-y-1">
              <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                VISIONARY DESIGN.
              </h1>
              <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                EXCEPTIONAL SPACES.
              </h2>
              <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#C6A46A] leading-tight">
                BUILT TO INSPIRE.
              </h2>
            </div>

            <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-xl">
              Custom homes and premium properties thoughtfully crafted for the way you live today and built to <span className="text-[#E3C594] font-normal underline decoration-[#C6A46A]/50 underline-offset-4">stand the test of time</span>.
            </p>

            {/* Framed Legacy Box (Faithful to Reference Image) */}
            <div className="relative p-6 sm:p-7 border border-[#C6A46A]/60 bg-gradient-to-br from-[#121B24]/90 to-[#0A1118]/90 rounded-xl shadow-xl max-w-lg group hover:border-[#C6A46A] transition">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-[#C6A46A]/15 text-[#E3C594] border border-[#C6A46A]/30">
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#C6A46A] font-semibold mb-1">
                    OUR PHILOSOPHY
                  </p>
                  <p className="font-cinzel text-base sm:text-lg font-bold text-white tracking-wider">
                    WE DON'T JUST BUILD HOMES.
                  </p>
                  <p className="font-cinzel text-base sm:text-lg font-bold text-[#E3C594] tracking-wider">
                    WE BUILD LEGACIES.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-explore-btn"
                onClick={onExploreProperties}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#B89354] to-[#C6A46A] hover:from-[#C6A46A] hover:to-[#D8B77E] text-[#0A1118] font-bold text-sm tracking-wider uppercase shadow-lg shadow-[#C6A46A]/20 transition flex items-center gap-2 group"
              >
                <span>Browse Properties</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>

              <button
                id="hero-consultation-btn"
                onClick={onOpenConsultation}
                className="px-6 py-3.5 rounded-xl border border-[#C6A46A]/50 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm tracking-wider uppercase transition flex items-center gap-2"
              >
                Schedule Consultation
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Hero Showcase (10 Luxury House Carousel rotating every 4 seconds) */}
          <div className="lg:col-span-6">
            <div
              className="relative rounded-2xl overflow-hidden border border-[#C6A46A]/30 shadow-2xl group bg-[#090E16]"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Image Slides with Smooth Cross-Fade Transition */}
              <div className="relative w-full h-[420px] sm:h-[480px]">
                {HERO_HOUSES.map((house, idx) => (
                  <div
                    key={house.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      idx === currentImageIndex ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    <img
                      src={house.imageUrl}
                      alt={house.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                  </div>
                ))}
              </div>

              <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-[#0A1118] via-transparent to-black/40" />

              {/* Top Control Bar: Tag, Timer Indicator & Prev/Next Arrows */}
              <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-auto">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A1118]/80 backdrop-blur-md border border-[#C6A46A]/40 text-[11px] font-medium text-[#E3C594]">
                  <span className="relative flex h-2 w-2">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6A46A] opacity-75 ${isPaused ? 'hidden' : ''}`} />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C6A46A]" />
                  </span>
                  <span className="uppercase tracking-widest font-semibold text-[10px]">
                    {activeHouse.tag}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-[10px] text-slate-300">
                    {currentImageIndex + 1} / {HERO_HOUSES.length}
                  </span>
                </div>

                {/* Prev / Next navigation buttons */}
                <div className="flex items-center gap-1.5">
                  <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0A1118]/80 backdrop-blur-md border border-white/15 text-[10px] text-slate-300">
                    <Clock className="w-3 h-3 text-[#C6A46A]" />
                    <span>{isPaused ? 'Paused' : '4s Auto'}</span>
                  </div>
                  <button
                    onClick={handlePrev}
                    aria-label="Previous House"
                    className="p-2 rounded-xl bg-[#0A1118]/80 hover:bg-[#C6A46A] text-white hover:text-[#0A1118] border border-white/15 transition backdrop-blur-md shadow-md"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next House"
                    className="p-2 rounded-xl bg-[#0A1118]/80 hover:bg-[#C6A46A] text-white hover:text-[#0A1118] border border-white/15 transition backdrop-blur-md shadow-md"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Bottom Overlay Badge with House Details & Indicators */}
              <div className="absolute bottom-4 left-4 right-4 z-30 p-4 rounded-xl bg-[#0A1118]/90 backdrop-blur-md border border-white/15 pointer-events-auto shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2.5">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] uppercase tracking-widest text-[#C6A46A] font-bold block">
                        {activeHouse.location}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C6A46A]/20 text-[#E3C594] border border-[#C6A46A]/40 font-semibold truncate">
                        {activeHouse.highlight}
                      </span>
                    </div>
                    <h3 className="font-cinzel text-white text-base sm:text-lg font-bold leading-tight">
                      {activeHouse.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                      {activeHouse.description}
                    </p>
                    <p className="text-[11px] text-[#E3C594]/90 mt-1 font-medium">
                      {activeHouse.specs}
                    </p>
                  </div>
                  <div className="sm:text-right shrink-0 pt-1">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                      Estimated Value
                    </span>
                    <span className="font-cinzel text-lg sm:text-xl font-bold text-[#E3C594]">
                      {activeHouse.price}
                    </span>
                  </div>
                </div>

                {/* 10 Navigation Dots / Segment Indicators */}
                <div className="flex items-center gap-1.5 pt-2 border-t border-white/10">
                  {HERO_HOUSES.map((house, idx) => (
                    <button
                      key={house.id}
                      onClick={() => setCurrentImageIndex(idx)}
                      title={`${house.title} (${idx + 1}/${HERO_HOUSES.length})`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentImageIndex
                          ? 'w-7 bg-[#C6A46A] shadow-sm shadow-[#C6A46A]/50'
                          : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Feature Pillars from Reference Image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 pt-8 border-t border-[#C6A46A]/20">
          <div className="p-4 rounded-xl bg-[#101924]/60 border border-white/5 hover:border-[#C6A46A]/30 transition group">
            <div className="w-10 h-10 rounded-lg bg-[#C6A46A]/10 border border-[#C6A46A]/30 flex items-center justify-center text-[#E3C594] mb-3 group-hover:scale-105 transition">
              <Lamp className="w-5 h-5" />
            </div>
            <h4 className="font-cinzel text-sm font-bold tracking-wider text-white mb-1">
              THOUGHTFUL DESIGN
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Smart layouts that maximize natural light, space, and architectural flow.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#101924]/60 border border-white/5 hover:border-[#C6A46A]/30 transition group">
            <div className="w-10 h-10 rounded-lg bg-[#C6A46A]/10 border border-[#C6A46A]/30 flex items-center justify-center text-[#E3C594] mb-3 group-hover:scale-105 transition">
              <Gem className="w-5 h-5" />
            </div>
            <h4 className="font-cinzel text-sm font-bold tracking-wider text-white mb-1">
              ELEVATED SPACES
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Beautiful, open spaces crafted for meaningful connection and luxury living.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#101924]/60 border border-white/5 hover:border-[#C6A46A]/30 transition group">
            <div className="w-10 h-10 rounded-lg bg-[#C6A46A]/10 border border-[#C6A46A]/30 flex items-center justify-center text-[#E3C594] mb-3 group-hover:scale-105 transition">
              <Bed className="w-5 h-5" />
            </div>
            <h4 className="font-cinzel text-sm font-bold tracking-wider text-white mb-1">
              PREMIUM FINISHES
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              High-quality materials, honed stone, and millwork for a timeless look.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#101924]/60 border border-white/5 hover:border-[#C6A46A]/30 transition group">
            <div className="w-10 h-10 rounded-lg bg-[#C6A46A]/10 border border-[#C6A46A]/30 flex items-center justify-center text-[#E3C594] mb-3 group-hover:scale-105 transition">
              <Leaf className="w-5 h-5" />
            </div>
            <h4 className="font-cinzel text-sm font-bold tracking-wider text-white mb-1">
              SEAMLESS LIVING
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Expansive indoor and outdoor living areas crafted for all four seasons.
            </p>
          </div>
        </div>

        {/* Real Estate Filtering / Search Bar with Core Categories (House, Apartment, Plot) */}
        <div id="property-search-section" className="mt-10 p-5 sm:p-6 rounded-2xl bg-[#0F1722] border border-[#C6A46A]/40 shadow-2xl">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-4 border-b border-white/10">
            {/* Category Filter Pills (House, Apartment, Plot) */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-[#C6A46A] font-semibold mr-1">
                Property Type:
              </span>
              {(['All', 'House', 'Apartment', 'Plot'] as const).map((cat) => (
                <button
                  key={cat}
                  id={`filter-category-${cat.toLowerCase()}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition ${
                    selectedCategory === cat
                      ? 'bg-[#C6A46A] text-[#0A1118] shadow-md shadow-[#C6A46A]/30'
                      : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {cat === 'All' ? 'All Properties' : `${cat}s`}
                </button>
              ))}
            </div>

            {/* Max Price Slider indicator */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 whitespace-nowrap">
                Max Price: <strong className="text-[#E3C594] font-cinzel">${priceFilter.toLocaleString()}</strong>
              </span>
              <input
                id="price-range-slider"
                type="range"
                min="500000"
                max="5000000"
                step="100000"
                value={priceFilter}
                onChange={(e) => setPriceFilter(Number(e.target.value))}
                className="w-32 sm:w-44 accent-[#C6A46A] cursor-pointer"
              />
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                id="property-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by city, neighborhood, or property title (e.g. Aspen Ridge, Villa Lumina, Penthouse)..."
                className="w-full pl-12 pr-4 py-3 bg-[#090E16] border border-white/15 focus:border-[#C6A46A] focus:outline-none rounded-xl text-sm text-white placeholder-slate-500 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            <button
              onClick={onExploreProperties}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#C6A46A] hover:bg-[#D4B27C] text-[#0A1118] font-bold text-xs uppercase tracking-wider transition whitespace-nowrap flex items-center justify-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filter Results</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
