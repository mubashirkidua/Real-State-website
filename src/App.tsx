import React, { useState, useEffect, useMemo } from 'react';
import { Property, PropertyCategory } from './types';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetailsModal } from './components/PropertyDetailsModal';
import { BookingModal } from './components/BookingModal';
import { SellPropertySection } from './components/SellPropertySection';
import { UserAccountSection } from './components/UserAccountSection';
import { AdminPortalSection } from './components/AdminPortalSection';
import { AuthModal } from './components/AuthModal';
import { BrandHighlights } from './components/BrandHighlights';
import { ConsultationModal } from './components/ConsultationModal';
import { BackgroundCarousel } from './components/BackgroundCarousel';
import {
  subscribeToProperties,
  seedPropertiesIfEmpty,
  removeProperty
} from './lib/firebase';
import {
  SlidersHorizontal,
  Home,
  Building,
  Layers,
  Sparkles,
  Loader2,
  CheckCircle2,
  ArrowUpDown
} from 'lucide-react';

function RealEstateApp() {
  const { user, openAuthModal } = useAuth();

  // Navigation & View state
  const [activeTab, setActiveTab] = useState<'home' | 'sell' | 'account' | 'admin'>('home');
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter State
  const [selectedCategory, setSelectedCategory] = useState<PropertyCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState<number>(4500000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');

  // Modals & Active Items
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [bookingProperty, setBookingProperty] = useState<Property | null>(null);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Seed & Subscribe to real-time properties
  useEffect(() => {
    // Initial check/seed
    seedPropertiesIfEmpty();

    const unsubscribe = subscribeToProperties((props) => {
      setProperties(props);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Filtered and sorted properties
  const filteredProperties = useMemo(() => {
    return properties
      .filter((p) => {
        // Category match
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }
        // Price limit
        if (p.price > priceFilter) {
          return false;
        }
        // Search query match
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchLocation = p.location.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          if (!matchTitle && !matchLocation && !matchDesc && !matchCat) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'newest') return (b.createdAt || 0) - (a.createdAt || 0);
        // default featured
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return (b.createdAt || 0) - (a.createdAt || 0);
      });
  }, [properties, selectedCategory, searchQuery, priceFilter, sortBy]);

  // Handle Edit Action
  const handleEditProperty = (prop: Property) => {
    setEditingProperty(prop);
    setActiveTab('sell');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Delete Action
  const handleDeleteProperty = async (propId: string) => {
    if (!window.confirm('Are you sure you want to remove this property listing?')) {
      return;
    }
    try {
      await removeProperty(propId);
      showToast('Property listing removed successfully.');
    } catch (err) {
      console.error(err);
      showToast('Error removing property.');
    }
  };

  const handleStartSell = () => {
    if (!user) {
      openAuthModal('signin');
      return;
    }
    setEditingProperty(null);
    setActiveTab('sell');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBrowse = () => {
    const el = document.getElementById('browse-properties');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070B10] text-slate-100 selection:bg-[#C6A46A] selection:text-[#0B121B] relative">
      {/* 8 to 10 Luxury Background Images rotating every 4 seconds */}
      <BackgroundCarousel />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Toast notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#0F1823] border border-[#C6A46A] text-white shadow-2xl animate-fade-in text-sm">
            <CheckCircle2 className="w-4 h-4 text-[#C6A46A]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Navigation */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            if (tab === 'sell' && !editingProperty) {
              setEditingProperty(null);
            }
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

      {/* Main Content View */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            {/* Hero Section matching Reference Image */}
            <Hero
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              priceFilter={priceFilter}
              setPriceFilter={setPriceFilter}
              onExploreProperties={scrollToBrowse}
              onOpenConsultation={() => setIsConsultationOpen(true)}
            />

            {/* Catalog Grid Section */}
            <section id="browse-properties" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              {/* Section Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6A46A] font-bold">
                      Available Portfolio
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="text-xs text-slate-400">
                      {filteredProperties.length} Properties
                    </span>
                  </div>
                  <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mt-1">
                    {selectedCategory === 'All'
                      ? 'Architectural Properties for Acquisition'
                      : `Curated ${selectedCategory}s`}
                  </h2>
                </div>

                {/* Filter and Sort controls */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Category Switchers */}
                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0F1722] border border-white/10">
                    {(['All', 'House', 'Apartment', 'Plot'] as const).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition ${
                          selectedCategory === cat
                            ? 'bg-[#C6A46A] text-[#0A1118]'
                            : 'text-slate-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Sort Dropdown */}
                  <div className="relative flex items-center">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="px-3.5 py-2 rounded-xl bg-[#0F1722] border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-[#C6A46A]"
                    >
                      <option value="featured">Featured First</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="newest">Recently Added</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Listings Grid */}
              {loading ? (
                <div className="py-24 text-center">
                  <Loader2 className="w-8 h-8 text-[#C6A46A] animate-spin mx-auto mb-3" />
                  <p className="font-cinzel text-sm uppercase tracking-wider text-slate-400">
                    Loading Properties...
                  </p>
                </div>
              ) : filteredProperties.length === 0 ? (
                <div className="text-center py-20 p-8 rounded-2xl bg-[#0F1722]/60 border border-white/10">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 mx-auto mb-4">
                    <SlidersHorizontal className="w-6 h-6" />
                  </div>
                  <h3 className="font-cinzel text-xl font-bold text-white mb-2">
                    No Properties Match Your Filter
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">
                    Try adjusting your maximum price slider, clearing your search query, or selecting another category.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSearchQuery('');
                      setPriceFilter(5000000);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#C6A46A] text-[#0A1118] text-xs font-bold uppercase tracking-wider transition"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onViewDetails={(prop) => setSelectedProperty(prop)}
                      onBookViewing={(prop) => setBookingProperty(prop)}
                      onEdit={handleEditProperty}
                      onDelete={handleDeleteProperty}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Brand Highlights & Tenets Section from Reference Image */}
            <BrandHighlights
              onScheduleConsultation={() => setIsConsultationOpen(true)}
            />
          </>
        )}

        {/* Sell / Add / Edit Property Section */}
        {activeTab === 'sell' && (
          <SellPropertySection
            editingProperty={editingProperty}
            onDone={() => {
              setActiveTab('home');
              showToast(
                editingProperty
                  ? 'Property updated successfully!'
                  : 'Property published to catalog successfully!'
              );
              setEditingProperty(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onCancel={() => {
              setActiveTab('home');
              setEditingProperty(null);
            }}
          />
        )}

        {/* User Account / My Properties Section */}
        {activeTab === 'account' && (
          <UserAccountSection
            allProperties={properties}
            onAddNewProperty={handleStartSell}
            onEditProperty={handleEditProperty}
            onViewDetails={(prop) => setSelectedProperty(prop)}
            onBookViewing={(prop) => setBookingProperty(prop)}
          />
        )}

        {/* Master Admin / Agency Executive Center */}
        {activeTab === 'admin' && (
          <AdminPortalSection
            allProperties={properties}
            onAddNewProperty={handleStartSell}
            onEditProperty={handleEditProperty}
            onViewDetails={(prop) => setSelectedProperty(prop)}
          />
        )}
      </main>

      {/* Property Details Modal */}
      {selectedProperty && (
        <PropertyDetailsModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onBookViewing={(prop) => {
            setSelectedProperty(null);
            setBookingProperty(prop);
          }}
          onEdit={handleEditProperty}
          onDelete={handleDeleteProperty}
        />
      )}

      {/* Viewing Booking Modal */}
      {bookingProperty && (
        <BookingModal
          property={bookingProperty}
          onClose={() => setBookingProperty(null)}
          onSuccess={() => {
            showToast('Viewing appointment recorded!');
          }}
        />
      )}

      {/* Authentication Modal */}
      <AuthModal />

      {/* Architectural Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RealEstateApp />
    </AuthProvider>
  );
}
