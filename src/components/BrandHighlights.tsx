import React, { useState } from 'react';
import {
  PenTool,
  Crown,
  ShieldCheck,
  Handshake,
  Leaf,
  Phone,
  Mail,
  Globe,
  ArrowRight,
  Play,
  Pause,
  RotateCw,
  Clock,
  Sparkles,
  MessageSquare,
  CheckCircle2,
  MapPin,
  Building2,
  Camera,
  Upload
} from 'lucide-react';

const SIGNATURE_ESTATES = [
  {
    title: 'The Crestview Pavilion',
    location: 'Aspen Ridge Estates, Calgary',
    price: '$2,850,000',
    specs: '4 Bed • 5 Bath • 5,400 Sq Ft',
    highlight: 'Zero-Edge Saline Pool & 22ft Vaulted Great Room',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Glass Horizon Estate',
    location: 'Beverly Hills Crest',
    price: '$3,450,000',
    specs: '5 Bed • 6 Bath • 6,200 Sq Ft',
    highlight: 'Floor-to-Ceiling Thermal Low-E Glass Walls',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Nordic Sanctuary',
    location: 'Highland Woods',
    price: '$2,490,000',
    specs: '4 Bed • 4.5 Bath • 4,800 Sq Ft',
    highlight: 'Hand-Cut Basalt Hearth & Geothermal HVAC',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Villa Serena Cascades',
    location: 'Pacific Palisades',
    price: '$4,200,000',
    specs: '6 Bed • 7 Bath • 7,100 Sq Ft',
    highlight: 'Cascading Water Gardens & Private Wellness Wing',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'The Cantilever Manor',
    location: 'Silicon Foothills',
    price: '$3,180,000',
    specs: '5 Bed • 5 Bath • 5,900 Sq Ft',
    highlight: '800-Bottle Glass Wine Vault & Pocketing Doors',
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Sunset Bel-Air Haven',
    location: 'Bel-Air Heights',
    price: '$3,900,000',
    specs: '5 Bed • 6 Bath • 6,400 Sq Ft',
    highlight: 'Skylit Courtyard Atrium & Nordic Cedar Sauna',
    imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Alpine Timber Lodge',
    location: 'Whistler Mountain Reserve',
    price: '$2,650,000',
    specs: '4 Bed • 4 Bath • 4,600 Sq Ft',
    highlight: 'Massive Granite Fireplace & Heated Ski Room',
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Minimalist Oasis',
    location: 'Scottsdale Reserve',
    price: '$2,950,000',
    specs: '4 Bed • 5 Bath • 5,100 Sq Ft',
    highlight: 'Rammed-Earth Massing & Zen Pebble Courtyard',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Waterfront Villa',
    location: 'Lakeview Promontory',
    price: '$4,850,000',
    specs: '6 Bed • 7 Bath • 8,200 Sq Ft',
    highlight: 'Private Deepwater Boat Slip & 2-Story Boathouse',
    imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Lumina Retreat',
    location: 'Oakwood Heights',
    price: '$2,780,000',
    specs: '4 Bed • 4 Bath • 4,950 Sq Ft',
    highlight: 'Double Calacatta Prep Islands & Japanese Garden',
    imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=80'
  }
];

interface BrandHighlightsProps {
  onScheduleConsultation: () => void;
}

export const BrandHighlights: React.FC<BrandHighlightsProps> = ({ onScheduleConsultation }) => {
  const [isRotating, setIsRotating] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState<number>(45); // 45 seconds per full turn (slow clock speed)
  const [activeEstateIdx, setActiveEstateIdx] = useState(0);
  const [ceoPhoto, setCeoPhoto] = useState<string>(() => {
    return localStorage.getItem('the_ocean_ceo_custom_photo') || '/ceo.jpg';
  });

  const handleCustomPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        localStorage.setItem('the_ocean_ceo_custom_photo', dataUrl);
        setCeoPhoto(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetCeoPhoto = () => {
    localStorage.removeItem('the_ocean_ceo_custom_photo');
    setCeoPhoto('/ceo.jpg');
  };

  const activeEstate = SIGNATURE_ESTATES[activeEstateIdx];

  return (
    <section className="bg-black/40 backdrop-blur-sm text-slate-100 border-t border-[#C6A46A]/20">
      {/* 5 Architectural Tenets from Reference Image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
          <div className="p-4 flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-[#C6A46A]/10 border border-[#C6A46A]/30 flex items-center justify-center text-[#E3C594] mb-3.5">
              <PenTool className="w-6 h-6" />
            </div>
            <h4 className="font-cinzel text-xs font-bold tracking-wider uppercase text-white mb-1.5">
              CUSTOM DESIGNS
            </h4>
            <span className="text-[#C6A46A] text-xs mb-1.5 font-bold">◆</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Homes tailored to your vision, needs, and lifestyle.
            </p>
          </div>

          <div className="p-4 flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-[#C6A46A]/10 border border-[#C6A46A]/30 flex items-center justify-center text-[#E3C594] mb-3.5">
              <Crown className="w-6 h-6" />
            </div>
            <h4 className="font-cinzel text-xs font-bold tracking-wider uppercase text-white mb-1.5">
              LUXURY LIVING
            </h4>
            <span className="text-[#C6A46A] text-xs mb-1.5 font-bold">◆</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              High-end features that elevate everyday living.
            </p>
          </div>

          <div className="p-4 flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-[#C6A46A]/10 border border-[#C6A46A]/30 flex items-center justify-center text-[#E3C594] mb-3.5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-cinzel text-xs font-bold tracking-wider uppercase text-white mb-1.5">
              UNCOMPROMISING QUALITY
            </h4>
            <span className="text-[#C6A46A] text-xs mb-1.5 font-bold">◆</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Built with precision and attention to every detail.
            </p>
          </div>

          <div className="p-4 flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-[#C6A46A]/10 border border-[#C6A46A]/30 flex items-center justify-center text-[#E3C594] mb-3.5">
              <Handshake className="w-6 h-6" />
            </div>
            <h4 className="font-cinzel text-xs font-bold tracking-wider uppercase text-white mb-1.5">
              TRUSTED EXPERTS
            </h4>
            <span className="text-[#C6A46A] text-xs mb-1.5 font-bold">◆</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Experienced professionals committed to exceptional results.
            </p>
          </div>

          <div className="p-4 flex flex-col items-center col-span-2 md:col-span-1">
            <div className="w-12 h-12 rounded-xl bg-[#C6A46A]/10 border border-[#C6A46A]/30 flex items-center justify-center text-[#E3C594] mb-3.5">
              <Leaf className="w-6 h-6" />
            </div>
            <h4 className="font-cinzel text-xs font-bold tracking-wider uppercase text-white mb-1.5">
              SUSTAINABLE SOLUTIONS
            </h4>
            <span className="text-[#C6A46A] text-xs mb-1.5 font-bold">◆</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Thoughtful ecological solutions for a better tomorrow.
            </p>
          </div>
        </div>

        {/* 10 Signature Architectural Residences - Clockwise Slow Circular Orbit */}
        <div className="mt-12 pt-10 border-t border-[#C6A46A]/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6A46A]/15 border border-[#C6A46A]/30 text-[#E3C594] text-xs mb-2">
              <Clock className="w-3.5 h-3.5 text-[#C6A46A]" />
              <span className="font-semibold tracking-wider uppercase text-[10px]">
                Clockwise Circular Orbit Dial
              </span>
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">
              10 Signature Residences & Estates
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xl mx-auto">
              Ghari ki soi ki tarah aahista aahista gool ghoomti hui hamari 10 ahem tareen architectural properties.
            </p>
          </div>

          {/* Interactive Clock Dial Container */}
          <div className="relative py-6 flex flex-col items-center">
            {/* Clock Orbit Stage */}
            <div className="clock-orbit-container relative w-[330px] h-[330px] sm:w-[460px] sm:h-[460px] md:w-[540px] md:h-[540px] flex items-center justify-center select-none">
              {/* Concentric Clock Track Rings */}
              <div className="absolute inset-0 rounded-full border border-[#C6A46A]/15 pointer-events-none" />
              <div className="absolute inset-4 sm:inset-6 rounded-full border border-dashed border-[#C6A46A]/25 pointer-events-none" />
              <div className="absolute inset-10 sm:inset-14 rounded-full border border-white/5 pointer-events-none" />

              {/* 12 Luxury Dial Markers (like a Swiss Clock) */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none"
                  style={{ transform: `translate(-50%, -50%) rotate(${i * 30}deg)` }}
                >
                  <div
                    className={`mx-auto ${
                      i % 3 === 0
                        ? 'w-1 h-3 bg-[#E3C594] rounded-full'
                        : 'w-0.5 h-1.5 bg-[#C6A46A]/40 rounded-full'
                    }`}
                  />
                </div>
              ))}

              {/* Rotating Clock Orbit Layer (Holds the 10 Circular Images and the Clock Needle) */}
              <div
                className="absolute inset-0 flex items-center justify-center animate-clock-orbit"
                style={
                  {
                    '--orbit-duration': `${rotationSpeed}s`,
                    animationPlayState: isRotating ? 'running' : 'paused'
                  } as React.CSSProperties
                }
              >
                {/* Clock Hand / Ghari Ki Soi - sweeping along the clockwise rotation */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 origin-bottom w-1 h-[115px] sm:h-[160px] md:h-[200px] pointer-events-none -translate-y-full flex flex-col items-center justify-start z-0">
                  {/* Glowing Arrow Tip at the end of the clock hand */}
                  <div className="w-2.5 h-2.5 rotate-45 bg-[#E3C594] border border-[#0A1118] shadow-md shadow-[#C6A46A]/70" />
                  {/* Hand Needle Body */}
                  <div className="w-0.5 sm:w-1 flex-1 bg-gradient-to-t from-[#C6A46A] via-[#E3C594] to-[#C6A46A] rounded-full opacity-80" />
                </div>

                {/* 10 Circular Image Capsules arranged around the orbit */}
                {SIGNATURE_ESTATES.map((estate, idx) => (
                  <div
                    key={idx}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${idx * 36}deg) translateY(calc(-1 * var(--orbit-radius, 120px)))`
                    }}
                  >
                    {/* Counter-rotating wrapper keeps photos upright while orbiting */}
                    <div
                      className="animate-clock-counter"
                      style={
                        {
                          '--orbit-duration': `${rotationSpeed}s`,
                          animationPlayState: isRotating ? 'running' : 'paused',
                          transform: `rotate(-${idx * 36}deg)`
                        } as React.CSSProperties
                      }
                    >
                      <button
                        onClick={() => {
                          setActiveEstateIdx(idx);
                          setIsRotating(false);
                        }}
                        className={`group relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 transition-all duration-300 shadow-xl ${
                          activeEstateIdx === idx
                            ? 'border-[#E3C594] scale-110 ring-4 ring-[#C6A46A]/60 z-20'
                            : 'border-[#C6A46A]/60 hover:border-[#E3C594] hover:scale-105 ring-2 ring-black/70'
                        }`}
                        title={`${estate.title} - ${estate.location} (Click to inspect)`}
                      >
                        <img
                          src={estate.imageUrl}
                          alt={estate.title}
                          className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                        {/* Shading overlay */}
                        <div
                          className={`absolute inset-0 rounded-full transition-colors ${
                            activeEstateIdx === idx
                              ? 'bg-transparent'
                              : 'bg-black/25 group-hover:bg-transparent'
                          }`}
                        />
                        {/* Number badge on each circle */}
                        <span className="absolute bottom-0 right-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#C6A46A] text-[#0A1118] text-[9px] sm:text-[10px] font-bold flex items-center justify-center shadow-md">
                          {idx + 1}
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Center Hub & Active Estate Display (Stationary in Center) */}
              <div className="relative z-10 w-32 h-32 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full bg-[#0A1118]/95 border-2 border-[#C6A46A]/50 shadow-2xl backdrop-blur-md flex flex-col items-center justify-center p-3 text-center ring-4 ring-black/80">
                {/* Center Pivot Golden Ring */}
                <div className="w-5 h-5 rounded-full bg-[#C6A46A] border-2 border-[#0A1118] mb-1 flex items-center justify-center shadow-inner">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0A1118]" />
                </div>

                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#C6A46A] font-bold">
                  Estate #{activeEstateIdx + 1} of 10
                </span>
                <h4 className="font-cinzel text-xs sm:text-sm font-bold text-white line-clamp-1 mt-0.5 px-1">
                  {activeEstate.title}
                </h4>
                <p className="text-[10px] sm:text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                  {activeEstate.location}
                </p>
                <p className="text-[11px] sm:text-xs font-bold text-[#E3C594] font-cinzel mt-0.5">
                  {activeEstate.price}
                </p>

                <button
                  onClick={onScheduleConsultation}
                  className="mt-1.5 px-2.5 py-1 rounded-full bg-[#C6A46A] hover:bg-[#D8B77E] text-[#0A1118] font-bold text-[9px] sm:text-[10px] uppercase tracking-wider transition shadow"
                >
                  Consultation
                </button>
              </div>
            </div>

            {/* Orbit Dial Controls & Interactive Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs">
              {/* Play / Pause Toggle */}
              <button
                onClick={() => setIsRotating(!isRotating)}
                className="px-4 py-2 rounded-xl bg-[#090E16] border border-[#C6A46A]/40 hover:border-[#C6A46A] text-white flex items-center gap-2 transition font-medium"
              >
                {isRotating ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-[#C6A46A]" />
                    <span>Pause Rotation</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-[#C6A46A]" />
                    <span>Resume Clockwise Rotation</span>
                  </>
                )}
              </button>

              {/* Speed Buttons */}
              <div className="flex items-center gap-1 bg-[#090E16] p-1 rounded-xl border border-white/10 text-[11px]">
                <span className="px-2 text-slate-400 text-[10px] uppercase font-semibold">Speed:</span>
                <button
                  onClick={() => setRotationSpeed(60)}
                  className={`px-2.5 py-1 rounded-lg transition font-medium ${
                    rotationSpeed === 60
                      ? 'bg-[#C6A46A] text-[#0A1118] font-bold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  title="Very Slow (60s rotation)"
                >
                  Slow (60s)
                </button>
                <button
                  onClick={() => setRotationSpeed(45)}
                  className={`px-2.5 py-1 rounded-lg transition font-medium ${
                    rotationSpeed === 45
                      ? 'bg-[#C6A46A] text-[#0A1118] font-bold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  title="Clock standard speed (45s rotation)"
                >
                  Clock (45s)
                </button>
                <button
                  onClick={() => setRotationSpeed(25)}
                  className={`px-2.5 py-1 rounded-lg transition font-medium ${
                    rotationSpeed === 25
                      ? 'bg-[#C6A46A] text-[#0A1118] font-bold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  title="Fast (25s rotation)"
                >
                  Medium (25s)
                </button>
              </div>

              {/* Quick Jump 1 to 10 Estate selector pills */}
              <div className="w-full flex items-center justify-center gap-1.5 pt-2 overflow-x-auto">
                {SIGNATURE_ESTATES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveEstateIdx(idx);
                      setIsRotating(false);
                    }}
                    className={`w-7 h-7 rounded-full text-[11px] font-bold transition flex items-center justify-center ${
                      activeEstateIdx === idx
                        ? 'bg-[#C6A46A] text-[#0A1118] shadow-md shadow-[#C6A46A]/30 scale-110'
                        : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/15'
                    }`}
                    title={`Estate #${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CEO & Executive Leadership Profile Section */}
        <div className="mt-14 pt-10 border-t border-[#C6A46A]/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6A46A]/15 border border-[#C6A46A]/30 text-[#E3C594] text-xs mb-2">
              <Crown className="w-3.5 h-3.5 text-[#C6A46A]" />
              <span className="font-semibold tracking-wider uppercase text-[10px]">
                Executive Leadership
              </span>
            </div>
            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider">
              Meet Our CEO
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xl mx-auto">
              Direct personal advisory and executive leadership from The Ocean Real State.
            </p>
          </div>

          <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-[#0F1722] via-[#121B27] to-[#0A1118] border border-[#C6A46A]/40 p-6 sm:p-10 shadow-2xl shadow-black/80">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* CEO Image Container */}
              <div className="md:col-span-5 flex flex-col items-center text-center">
                <div className="relative group">
                  {/* Decorative Glowing Rings */}
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#C6A46A] via-[#E3C594] to-[#C6A46A] opacity-70 blur-sm group-hover:opacity-100 transition duration-500" />
                  
                  {/* Circular CEO Photo Frame */}
                  <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-[#C6A46A] shadow-2xl ring-4 ring-black/70 bg-[#090E16]">
                    <img
                      src={ceoPhoto}
                      alt="Muhammad Mubashir Ali - CEO The Ocean Real State"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Hover overlay for instant photo update */}
                    <label
                      htmlFor="ceo-photo-upload"
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center cursor-pointer text-white text-xs gap-1.5 p-2"
                      title="Upload your exact CEO picture"
                    >
                      <Camera className="w-6 h-6 text-[#C6A46A]" />
                      <span className="font-semibold text-[11px] text-[#E3C594]">Change Photo</span>
                      <span className="text-[9px] text-slate-300">Click to upload</span>
                    </label>
                  </div>

                  {/* Hidden File Input for CEO Photo */}
                  <input
                    id="ceo-photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleCustomPhotoUpload}
                    className="hidden"
                  />

                  {/* Verified Badge */}
                  <div className="absolute bottom-2 right-4 bg-[#C6A46A] text-[#0A1118] p-1.5 rounded-full shadow-lg border-2 border-[#0A1118]" title="Verified CEO">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>

                <div className="mt-3 flex flex-col items-center gap-1.5">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Available for Direct Advisory</span>
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <label
                      htmlFor="ceo-photo-upload"
                      className="cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#C6A46A]/20 border border-white/10 hover:border-[#C6A46A] text-[10px] text-slate-300 hover:text-white transition"
                    >
                      <Upload className="w-3 h-3 text-[#C6A46A]" />
                      <span>Upload Picture</span>
                    </label>
                    {ceoPhoto !== '/ceo.jpg' && (
                      <button
                        onClick={handleResetCeoPhoto}
                        className="text-[10px] text-slate-400 hover:text-red-400 underline transition"
                      >
                        Reset Photo
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* CEO Info & Contact Data */}
              <div className="md:col-span-7 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-[#C6A46A] font-bold">
                      Chief Executive Officer
                    </span>
                  </div>
                  <h4 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide">
                    Muhammad Mubashir Ali
                  </h4>
                  <p className="text-xs text-[#E3C594] font-medium mt-0.5">
                    CEO, The Ocean Real State
                  </p>
                </div>

                {/* CEO Quote / Statement */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic border-l-2 border-[#C6A46A]/60 pl-3">
                  "At <span className="text-white font-medium">The Ocean Real State</span>, we are committed to excellence, integrity, and exceptional service for all your property, villa, and prime plot investments. Feel free to contact me directly via Phone, WhatsApp, or Email."
                </p>

                {/* Direct Contact Cards (Clickable Email, Mobile, and WhatsApp) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                  {/* Mobile Phone (Clickable) */}
                  <a
                    href="tel:03232930657"
                    className="p-3 rounded-xl bg-[#090E16]/80 border border-white/10 hover:border-[#C6A46A] hover:bg-[#C6A46A]/10 transition flex flex-col justify-between group"
                    title="Call 0323-2930657"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        Mobile
                      </span>
                      <div className="w-7 h-7 rounded-lg bg-[#C6A46A]/15 text-[#E3C594] flex items-center justify-center border border-[#C6A46A]/30 group-hover:bg-[#C6A46A] group-hover:text-[#0A1118] transition">
                        <Phone className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-white group-hover:text-[#E3C594] transition truncate">
                      0323-2930657
                    </span>
                  </a>

                  {/* WhatsApp (Clickable) */}
                  <a
                    href="https://wa.me/923428156086?text=Hello%20Muhammad%20Mubashir%20Ali,%20I%20am%20interested%20in%20The%20Ocean%20Real%20State%20properties"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#090E16]/80 border border-white/10 hover:border-emerald-500 hover:bg-emerald-500/10 transition flex flex-col justify-between group"
                    title="WhatsApp 0342-8156086"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        WhatsApp
                      </span>
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30 group-hover:bg-emerald-500 group-hover:text-white transition">
                        <MessageSquare className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-white group-hover:text-emerald-400 transition truncate">
                      0342-8156086
                    </span>
                  </a>

                  {/* Email (Clickable) */}
                  <a
                    href="mailto:alimuhammd98573@gmail.com?subject=Inquiry%20for%20CEO%20Muhammad%20Mubashir%20Ali%20-%20The%20Ocean%20Real%20State"
                    className="p-3 rounded-xl bg-[#090E16]/80 border border-white/10 hover:border-[#C6A46A] hover:bg-[#C6A46A]/10 transition flex flex-col justify-between group"
                    title="Email alimuhammd98573@gmail.com"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        Email
                      </span>
                      <div className="w-7 h-7 rounded-lg bg-[#C6A46A]/15 text-[#E3C594] flex items-center justify-center border border-[#C6A46A]/30 group-hover:bg-[#C6A46A] group-hover:text-[#0A1118] transition">
                        <Mail className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-white group-hover:text-[#E3C594] transition truncate block" title="alimuhammd98573@gmail.com">
                      alimuhammd98573@gmail.com
                    </span>
                  </a>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="https://wa.me/923428156086?text=Hello%20Muhammad%20Mubashir%20Ali,%20I%20am%20interested%20in%20The%20Ocean%20Real%20State%20properties"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-lg shadow-emerald-950/40"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </a>

                  <a
                    href="tel:03232930657"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#B89354] to-[#C6A46A] hover:from-[#C6A46A] hover:to-[#D8B77E] text-[#0A1118] font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-md shadow-[#C6A46A]/20"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call CEO</span>
                  </a>

                  <a
                    href="mailto:alimuhammd98573@gmail.com?subject=Property%20Consultation%20-%20The%20Ocean%20Real%20State"
                    className="px-4 py-2.5 rounded-xl border border-[#C6A46A]/40 hover:border-[#C6A46A] bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold transition flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-[#C6A46A]" />
                    <span>Send Email</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Banner Block (The Ocean Real State - Updated Contact Data) */}
        <div className="mt-14 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0F1722] via-[#141E2B] to-[#0F1722] border border-[#C6A46A]/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Brand Info & Contact */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl border border-[#C6A46A]/60 bg-[#C6A46A]/10 flex items-center justify-center text-[#E3C594] font-cinzel font-bold text-xl">
                ORS
              </div>
              <div>
                <h3 className="font-cinzel text-2xl font-bold tracking-wide text-white">
                  THE OCEAN REAL STATE
                </h3>
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#C6A46A] font-semibold">
                  COASTAL & PRIME LUXURY ESTATES
                </p>
              </div>
            </div>

            <p className="text-xs uppercase tracking-widest text-slate-300 font-medium">
              VISIONARY DESIGN. EXCEPTIONAL SPACES.
            </p>
            <p className="font-cinzel text-sm font-semibold text-[#E3C594]">
              BUILDING LEGACIES ACROSS THE HORIZON.
            </p>

            {/* Clickable Contact Details */}
            <div className="space-y-2.5 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <Crown className="w-4 h-4 text-[#C6A46A]" />
                <span className="font-medium text-white">CEO: Muhammad Mubashir Ali</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C6A46A]" />
                <span className="text-slate-400">Mobile:</span>
                <a 
                  href="tel:03232930657" 
                  className="hover:text-[#E3C594] text-white font-medium underline underline-offset-2 transition"
                >
                  0323-2930657
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-400">WhatsApp:</span>
                <a 
                  href="https://wa.me/923428156086?text=Hello%20Muhammad%20Mubashir%20Ali,%20I%20am%20interested%20in%20The%20Ocean%20Real%20State%20properties" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 text-emerald-400 font-medium underline underline-offset-2 transition"
                >
                  0342-8156086
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C6A46A]" />
                <span className="text-slate-400">Email:</span>
                <a 
                  href="mailto:alimuhammd98573@gmail.com" 
                  className="hover:text-[#E3C594] text-white underline underline-offset-2 transition"
                >
                  alimuhammd98573@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#C6A46A]" />
                <span className="text-slate-400">Website:</span>
                <span className="text-slate-300">theoceanrealestate.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#C6A46A]" />
                <span>Ocean Executive Plaza, Coastal Boulevard</span>
              </div>
            </div>
          </div>

          {/* CTA Box from Reference */}
          <div className="lg:col-span-6 bg-[#090E16] p-6 sm:p-8 rounded-2xl border border-[#C6A46A]/40 text-center lg:text-left flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C6A46A] font-bold block mb-1">
                Begin Your Journey With Us
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white leading-snug">
                LET'S BUILD SOMETHING <br className="hidden sm:inline" />
                <span className="text-[#E3C594]">EXTRAORDINARY.</span>
              </h3>
              <p className="text-xs text-slate-400 mt-2">
                Connect directly with CEO Muhammad Mubashir Ali and our senior architectural consultants. We'll handle every detail.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://wa.me/923428156086"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp: 0342-8156086</span>
              </a>

              <a
                href="tel:03232930657"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#B89354] to-[#C6A46A] hover:from-[#C6A46A] hover:to-[#D8B77E] text-[#0A1118] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#C6A46A]/20 transition flex items-center justify-center gap-2 group"
              >
                <Phone className="w-4 h-4" />
                <span>Call: 0323-2930657</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bar: "MODERN DESIGN ◆ TIMELESS QUALITY ◆ INSPIRED LIVING ◆ BUILT TO LAST" */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-slate-300 font-cinzel tracking-wider uppercase">
            <span>Modern Design</span>
            <span className="text-[#C6A46A]">◆</span>
            <span>Timeless Quality</span>
            <span className="text-[#C6A46A]">◆</span>
            <span>Inspired Living</span>
            <span className="text-[#C6A46A]">◆</span>
            <span>The Ocean Real State</span>
          </div>

          <div>
            © {new Date().getFullYear()} The Ocean Real State. All rights reserved.
          </div>
        </div>
      </div>
    </section>
  );
};
