import React, { useState, useEffect, useMemo } from 'react';
import { Property, ViewingBooking, PropertyStatus, BookingStatus } from '../types';
import { useAuth } from '../context/AuthContext';
import {
  subscribeToAllBookings,
  updateBookingStatus,
  removeBooking,
  updatePropertyStatus,
  removeProperty
} from '../lib/firebase';
import {
  ShieldCheck,
  Building2,
  Calendar,
  DollarSign,
  Users,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  MapPin,
  Trash2,
  Edit3,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  ExternalLink,
  PlusCircle,
  RefreshCw,
  Lock,
  Unlock,
  Check,
  Filter,
  Eye,
  Send,
  Home
} from 'lucide-react';

interface AdminPortalSectionProps {
  allProperties: Property[];
  onAddNewProperty: () => void;
  onEditProperty: (property: Property) => void;
  onViewDetails: (property: Property) => void;
}

export const AdminPortalSection: React.FC<AdminPortalSectionProps> = ({
  allProperties,
  onAddNewProperty,
  onEditProperty,
  onViewDetails
}) => {
  const { user, openAuthModal } = useAuth();

  // Admin access state
  // Auto-grant if user matches CEO/Admin email OR if admin passcode is entered
  const isMasterEmail = user?.email?.toLowerCase().includes('alimuhammad') ||
                        user?.email?.toLowerCase().includes('mubashir') ||
                        user?.email?.toLowerCase() === 'alimuhammad98573@gmail.com' ||
                        user?.email?.toLowerCase() === 'alimuhammd98573@gmail.com';

  const [hasPasscodeAccess, setHasPasscodeAccess] = useState<boolean>(() => {
    return localStorage.getItem('the_ocean_admin_unlocked') === 'true';
  });

  const [passcodeInput, setPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState('');

  const isAdminAuthorized = isMasterEmail || hasPasscodeAccess;

  // Active Tab: 'leads' (bookings), 'inventory' (properties), 'analytics' (metrics)
  const [activeTab, setActiveTab] = useState<'leads' | 'inventory' | 'agency'>('leads');

  // Bookings state
  const [bookings, setBookings] = useState<ViewingBooking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [bookingFilter, setBookingFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all');
  const [bookingSearch, setBookingSearch] = useState('');

  // Inventory filter state
  const [propertySearch, setPropertySearch] = useState('');
  const [propertyCategory, setPropertyCategory] = useState<string>('all');
  const [propertyStatusFilter, setPropertyStatusFilter] = useState<string>('all');

  // Action status message
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3000);
  };

  // Subscribe to all real-time viewing bookings across entire platform
  useEffect(() => {
    const unsub = subscribeToAllBookings((data) => {
      setBookings(data);
      setLoadingBookings(false);
    });
    return () => unsub();
  }, []);

  const handlePasscodeUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcodeInput.trim() === 'ocean786' || passcodeInput.trim() === 'admin123' || passcodeInput.trim().toLowerCase() === 'admin') {
      localStorage.setItem('the_ocean_admin_unlocked', 'true');
      setHasPasscodeAccess(true);
      setPasscodeError('');
    } else {
      setPasscodeError('Invalid administrative key. (Default test key: ocean786)');
    }
  };

  const handleLockAdmin = () => {
    localStorage.removeItem('the_ocean_admin_unlocked');
    setHasPasscodeAccess(false);
  };

  // Filtered bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchFilter = bookingFilter === 'all' || b.status === bookingFilter;
      const search = bookingSearch.toLowerCase();
      const matchSearch =
        !search ||
        b.userName?.toLowerCase().includes(search) ||
        b.userPhone?.toLowerCase().includes(search) ||
        b.userEmail?.toLowerCase().includes(search) ||
        b.propertyTitle?.toLowerCase().includes(search) ||
        b.propertyLocation?.toLowerCase().includes(search);
      return matchFilter && matchSearch;
    });
  }, [bookings, bookingFilter, bookingSearch]);

  // Filtered properties
  const filteredProperties = useMemo(() => {
    return allProperties.filter((p) => {
      const matchCat = propertyCategory === 'all' || p.category === propertyCategory;
      const currentStatus = p.status || 'available';
      const matchStatus = propertyStatusFilter === 'all' || currentStatus === propertyStatusFilter;
      const search = propertySearch.toLowerCase();
      const matchSearch =
        !search ||
        p.title.toLowerCase().includes(search) ||
        p.location.toLowerCase().includes(search);
      return matchCat && matchStatus && matchSearch;
    });
  }, [allProperties, propertyCategory, propertyStatusFilter, propertySearch]);

  // Metrics Calculations
  const totalPortfolioValue = useMemo(() => {
    return allProperties.reduce((acc, curr) => acc + (curr.price || 0), 0);
  }, [allProperties]);

  const activeLeadsCount = bookings.filter((b) => b.status === 'confirmed' || b.status === 'pending').length;
  const completedLeadsCount = bookings.filter((b) => b.status === 'completed').length;

  const handleStatusChange = async (bookingId: string, status: BookingStatus) => {
    try {
      await updateBookingStatus(bookingId, status);
      showNotice(`Lead marked as ${status.toUpperCase()}`);
    } catch (err) {
      console.error(err);
      alert('Failed to update booking status. Ensure you are signed in.');
    }
  };

  const handleDeleteBooking = async (bookingId: string) => {
    if (!window.confirm('Delete this viewing appointment lead permanently?')) return;
    try {
      await removeBooking(bookingId);
      showNotice('Lead removed successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to delete booking.');
    }
  };

  const handlePropertyStatusChange = async (propertyId: string, status: PropertyStatus) => {
    try {
      await updatePropertyStatus(propertyId, status);
      showNotice(`Property status updated to ${status.toUpperCase()}`);
    } catch (err) {
      console.error(err);
      alert('Failed to update property status.');
    }
  };

  const handleDeleteProperty = async (propertyId: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this listing from the database?')) return;
    try {
      await removeProperty(propertyId);
      showNotice('Property deleted successfully from database');
    } catch (err) {
      console.error(err);
      alert('Failed to delete property.');
    }
  };

  // If not authorized yet, show the Executive Login / Quick Unlock Screen
  if (!isAdminAuthorized) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-slate-100 animate-fade-in">
        <div className="p-8 sm:p-10 rounded-2xl bg-[#0F1722] border border-[#C6A46A]/40 shadow-2xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#C6A46A]/10 border border-[#C6A46A]/30 text-[#C6A46A] flex items-center justify-center mx-auto mb-5 shadow-lg">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <span className="text-[11px] font-semibold tracking-widest uppercase text-[#C6A46A] block mb-1">
            EXECUTIVE CONTROL PORTAL
          </span>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mb-2">
            The Ocean Real State Admin
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mb-8 max-w-sm mx-auto">
            Authorized portal for Agency Directors, CEO Muhammad Mubashir Ali, and Executive Staff to manage inquiries, clients, and inventory.
          </p>

          {/* Option 1: Login with Google / Email */}
          <div className="space-y-4 mb-8">
            <button
              id="admin-auth-modal-btn"
              onClick={() => openAuthModal('signin')}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#B89354] to-[#C6A46A] hover:from-[#C6A46A] hover:to-[#D8B77E] text-[#0A1118] font-bold text-xs uppercase tracking-wider transition shadow-lg flex items-center justify-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span>Sign In with Owner Account</span>
            </button>
            <p className="text-[11px] text-slate-500">
              Admin account: <span className="text-slate-400 font-mono">alimuhammad98573@gmail.com</span>
            </p>
          </div>

          <div className="relative flex py-2 items-center mb-6">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink mx-4 text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
              OR QUICK ACCESS KEY
            </span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          {/* Option 2: Quick Passcode for Client Review */}
          <form onSubmit={handlePasscodeUnlock} className="space-y-3 text-left">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Agency Security Key:</span>
                <span className="text-[10px] text-[#C6A46A]">Demo Key: ocean786</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={passcodeInput}
                  onChange={(e) => setPasscodeInput(e.target.value)}
                  placeholder="Enter admin security key..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#090E16] border border-white/15 focus:border-[#C6A46A] text-white text-xs placeholder:text-slate-500 outline-none transition"
                />
              </div>
              {passcodeError && (
                <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{passcodeError}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs tracking-wider uppercase transition flex items-center justify-center gap-2 border border-white/10"
            >
              <Unlock className="w-3.5 h-3.5 text-[#C6A46A]" />
              <span>Unlock Admin Dashboard</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in text-slate-100">
      {/* Toast Notice */}
      {actionNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F1722] border border-[#C6A46A] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#C6A46A]" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Top Admin Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#0F1722] border border-[#C6A46A]/40 mb-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#C6A46A]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="p-1.5 rounded-lg bg-[#C6A46A]/20 border border-[#C6A46A]/40 text-[#E3C594]">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#C6A46A]">
                EXECUTIVE MANAGEMENT CENTER
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                LIVE FIRESTORE SYNC
              </span>
            </div>

            <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide">
              The Ocean Real State — Administration
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Control center for CEO Muhammad Mubashir Ali and agency leadership. Track incoming client leads, viewing appointments, inventory availability, and platform performance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              id="admin-add-prop-btn"
              onClick={onAddNewProperty}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#B89354] to-[#C6A46A] hover:from-[#C6A46A] hover:to-[#D8B77E] text-[#0A1118] font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-lg"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Listing</span>
            </button>

            <button
              onClick={handleLockAdmin}
              className="px-3.5 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition flex items-center gap-1.5"
              title="Lock Admin Session"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock Panel</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {/* Metric 1: Total Leads */}
        <div className="p-5 rounded-2xl bg-[#0F1722] border border-white/10 hover:border-[#C6A46A]/40 transition shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Client Leads</span>
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
              {bookings.length}
            </span>
            <span className="text-[11px] text-emerald-400 font-medium">
              {activeLeadsCount} Active
            </span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">Viewing appointments requested</span>
        </div>

        {/* Metric 2: Total Listings */}
        <div className="p-5 rounded-2xl bg-[#0F1722] border border-white/10 hover:border-[#C6A46A]/40 transition shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Properties</span>
            <div className="w-8 h-8 rounded-xl bg-[#C6A46A]/10 text-[#C6A46A] flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
              {allProperties.length}
            </span>
            <span className="text-[11px] text-[#E3C594] font-medium">
              Villas, Houses & Plots
            </span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">Active in Cloud Firestore</span>
        </div>

        {/* Metric 3: Total Portfolio Value */}
        <div className="p-5 rounded-2xl bg-[#0F1722] border border-white/10 hover:border-[#C6A46A]/40 transition shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Portfolio Volume</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
              ${(totalPortfolioValue / 1_000_000).toFixed(1)}M
            </span>
            <span className="text-[11px] text-slate-400">USD</span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">Combined inventory valuation</span>
        </div>

        {/* Metric 4: Completed Deals */}
        <div className="p-5 rounded-2xl bg-[#0F1722] border border-white/10 hover:border-[#C6A46A]/40 transition shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Completed Follow-ups</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
              {completedLeadsCount}
            </span>
            <span className="text-[11px] text-purple-400 font-medium">Walkthroughs Done</span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">Client tours finished</span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-4 border-b border-white/10 mb-8">
        <button
          onClick={() => setActiveTab('leads')}
          className={`flex items-center gap-2 pb-3.5 text-sm font-semibold tracking-wider transition relative ${
            activeTab === 'leads' ? 'text-[#E3C594]' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Client Leads & Viewing Requests</span>
          <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C6A46A]/20 text-[#E3C594] border border-[#C6A46A]/30">
            {bookings.length}
          </span>
          {activeTab === 'leads' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C6A46A]" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex items-center gap-2 pb-3.5 text-sm font-semibold tracking-wider transition relative ${
            activeTab === 'inventory' ? 'text-[#E3C594]' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Inventory Manager (All Listings)</span>
          <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-slate-300">
            {allProperties.length}
          </span>
          {activeTab === 'inventory' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C6A46A]" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('agency')}
          className={`flex items-center gap-2 pb-3.5 text-sm font-semibold tracking-wider transition relative ${
            activeTab === 'agency' ? 'text-[#E3C594]' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Agency & CEO Profile</span>
          {activeTab === 'agency' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C6A46A]" />
          )}
        </button>
      </div>

      {/* TAB 1: CLIENT LEADS & VIEWING APPOINTMENTS */}
      {activeTab === 'leads' && (
        <div className="space-y-6">
          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0F1722] border border-white/10">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={bookingSearch}
                onChange={(e) => setBookingSearch(e.target.value)}
                placeholder="Search leads by Client Name, Phone, Email, Property..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#090E16] border border-white/10 text-xs text-white placeholder:text-slate-500 outline-none focus:border-[#C6A46A] transition"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {(['all', 'confirmed', 'pending', 'completed', 'cancelled'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setBookingFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition ${
                    bookingFilter === status
                      ? 'bg-[#C6A46A] text-[#0A1118]'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Bookings List */}
          {filteredBookings.length === 0 ? (
            <div className="text-center py-16 p-8 rounded-2xl bg-[#0F1722]/50 border border-white/5">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 mx-auto mb-4">
                <Calendar className="w-7 h-7" />
              </div>
              <h3 className="font-cinzel text-lg font-bold text-white mb-1">
                No Viewing Leads Found
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                {bookingSearch || bookingFilter !== 'all'
                  ? 'Try clearing the search query or filter to see all leads.'
                  : 'When visitors schedule a viewing on any property, their contact information, appointment time, and notes will appear here in real-time.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking) => {
                const whatsappNumber = booking.userPhone?.replace(/[^0-9]/g, '');
                return (
                  <div
                    key={booking.id}
                    className="p-5 sm:p-6 rounded-2xl bg-[#0F1722] border border-white/10 hover:border-[#C6A46A]/40 transition shadow-xl"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                      {/* Left: Client and Property Overview */}
                      <div className="flex items-start sm:items-center gap-4 min-w-0">
                        <img
                          src={booking.propertyImageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80'}
                          alt={booking.propertyTitle}
                          referrerPolicy="no-referrer"
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shrink-0 border border-white/10 shadow-md"
                        />

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h4 className="font-cinzel text-base sm:text-lg font-bold text-white">
                              {booking.userName || 'Client'}
                            </h4>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              booking.status === 'confirmed'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : booking.status === 'completed'
                                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                : booking.status === 'cancelled'
                                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            }`}>
                              {booking.status}
                            </span>
                          </div>

                          <div className="text-xs text-[#E3C594] font-medium flex items-center gap-1.5 mb-2 truncate">
                            <Building2 className="w-3.5 h-3.5 text-[#C6A46A] shrink-0" />
                            <span className="truncate">{booking.propertyTitle}</span>
                            {booking.propertyLocation && (
                              <span className="text-slate-400 text-[11px] font-normal">
                                • {booking.propertyLocation}
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                            <span className="flex items-center gap-1 font-semibold text-white bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                              <Calendar className="w-3.5 h-3.5 text-[#C6A46A]" />
                              {booking.date}
                            </span>
                            <span className="flex items-center gap-1 text-slate-300 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                              <Clock className="w-3.5 h-3.5 text-[#C6A46A]" />
                              {booking.timeSlot}
                            </span>
                            {booking.createdAt && (
                              <span className="text-[11px] text-slate-500">
                                Submitted {new Date(booking.createdAt).toLocaleDateString()}
                              </span>
                            )}
                          </div>

                          {/* Notes if any */}
                          {booking.notes && (
                            <div className="mt-3 p-2.5 rounded-xl bg-[#090E16] border border-white/5 text-xs text-slate-300 max-w-xl">
                              <span className="font-semibold text-[11px] text-[#C6A46A] block mb-0.5">
                                Client Notes:
                              </span>
                              "{booking.notes}"
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Direct Lead Contact & Status Controls */}
                      <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 shrink-0 border-t lg:border-t-0 pt-4 lg:pt-0 border-white/10">
                        {/* 1-Click Client Action Buttons */}
                        <div className="flex items-center gap-2">
                          {booking.userPhone && (
                            <>
                              <a
                                href={`tel:${booking.userPhone}`}
                                className="px-3 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 text-xs font-semibold flex items-center gap-1.5 transition"
                                title="Call Client Phone"
                              >
                                <Phone className="w-3.5 h-3.5" />
                                <span>{booking.userPhone}</span>
                              </a>

                              <a
                                href={`https://wa.me/${whatsappNumber}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-xl bg-emerald-500 text-[#0A1118] hover:bg-emerald-400 font-bold transition shadow-md"
                                title="Chat on WhatsApp"
                              >
                                <MessageSquare className="w-4 h-4" />
                              </a>
                            </>
                          )}

                          {booking.userEmail && (
                            <a
                              href={`mailto:${booking.userEmail}?subject=The Ocean Real State - Viewing Booking for ${encodeURIComponent(booking.propertyTitle)}`}
                              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition"
                              title="Send Email"
                            >
                              <Mail className="w-4 h-4" />
                            </a>
                          )}

                          <button
                            onClick={() => handleDeleteBooking(booking.id)}
                            className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/30 text-slate-400 hover:text-rose-400 transition"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Status Manager Dropdown / Pills */}
                        <div className="flex items-center gap-1.5 bg-[#090E16] p-1 rounded-xl border border-white/10">
                          <span className="text-[10px] uppercase text-slate-500 px-2 font-semibold">Status:</span>
                          <button
                            onClick={() => handleStatusChange(booking.id, 'confirmed')}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition ${
                              booking.status === 'confirmed'
                                ? 'bg-emerald-500 text-[#0A1118]'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            Confirmed
                          </button>
                          <button
                            onClick={() => handleStatusChange(booking.id, 'completed')}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition ${
                              booking.status === 'completed'
                                ? 'bg-purple-500 text-white'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            Completed
                          </button>
                          <button
                            onClick={() => handleStatusChange(booking.id, 'cancelled')}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition ${
                              booking.status === 'cancelled'
                                ? 'bg-rose-500 text-white'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: INVENTORY MANAGER (ALL PROPERTIES) */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0F1722] border border-white/10">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={propertySearch}
                onChange={(e) => setPropertySearch(e.target.value)}
                placeholder="Search inventory by title or location..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#090E16] border border-white/10 text-xs text-white placeholder:text-slate-500 outline-none focus:border-[#C6A46A] transition"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={propertyCategory}
                onChange={(e) => setPropertyCategory(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#090E16] border border-white/10 text-xs text-white outline-none focus:border-[#C6A46A]"
              >
                <option value="all">All Types</option>
                <option value="House">Houses</option>
                <option value="Apartment">Apartments</option>
                <option value="Plot">Plots</option>
              </select>

              <select
                value={propertyStatusFilter}
                onChange={(e) => setPropertyStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#090E16] border border-white/10 text-xs text-white outline-none focus:border-[#C6A46A]"
              >
                <option value="all">All Statuses</option>
                <option value="available">Available</option>
                <option value="under_offer">Under Offer</option>
                <option value="sold">Sold</option>
              </select>

              <button
                onClick={onAddNewProperty}
                className="px-3.5 py-2 rounded-xl bg-[#C6A46A] text-[#0A1118] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition hover:bg-[#D8B77E]"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Property</span>
              </button>
            </div>
          </div>

          {/* Properties Table / Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((prop) => {
              const currentStatus = prop.status || 'available';
              return (
                <div
                  key={prop.id}
                  className="rounded-2xl bg-[#0F1722] border border-white/10 hover:border-[#C6A46A]/40 transition overflow-hidden flex flex-col shadow-xl"
                >
                  <div className="relative h-48 bg-black/40 overflow-hidden">
                    <img
                      src={prop.imageUrl}
                      alt={prop.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#B89354] text-[#0A1118]">
                        {prop.category}
                      </span>
                      {prop.isFeatured && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/20 text-white backdrop-blur-md">
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${
                        currentStatus === 'available'
                          ? 'bg-emerald-500/90 text-[#0A1118]'
                          : currentStatus === 'under_offer'
                          ? 'bg-amber-500/90 text-[#0A1118]'
                          : 'bg-rose-600/90 text-white'
                      }`}>
                        {currentStatus === 'under_offer' ? 'Under Offer' : currentStatus}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 bg-black/80 px-2.5 py-1 rounded-lg backdrop-blur-md text-white font-cinzel font-bold text-sm">
                      ${prop.price.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-cinzel text-base font-bold text-white line-clamp-1 mb-1">
                        {prop.title}
                      </h4>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mb-4 truncate">
                        <MapPin className="w-3.5 h-3.5 text-[#C6A46A] shrink-0" />
                        <span className="truncate">{prop.location}</span>
                      </p>

                      {/* Status Selector */}
                      <div className="mb-4">
                        <label className="text-[10px] font-semibold uppercase text-slate-400 block mb-1.5">
                          Set Listing Status:
                        </label>
                        <div className="grid grid-cols-3 gap-1 bg-[#090E16] p-1 rounded-xl border border-white/10">
                          <button
                            onClick={() => handlePropertyStatusChange(prop.id, 'available')}
                            className={`py-1 rounded-lg text-[10px] font-bold uppercase transition ${
                              currentStatus === 'available'
                                ? 'bg-emerald-500 text-[#0A1118]'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            Active
                          </button>
                          <button
                            onClick={() => handlePropertyStatusChange(prop.id, 'under_offer')}
                            className={`py-1 rounded-lg text-[10px] font-bold uppercase transition ${
                              currentStatus === 'under_offer'
                                ? 'bg-amber-500 text-[#0A1118]'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            Offer
                          </button>
                          <button
                            onClick={() => handlePropertyStatusChange(prop.id, 'sold')}
                            className={`py-1 rounded-lg text-[10px] font-bold uppercase transition ${
                              currentStatus === 'sold'
                                ? 'bg-rose-500 text-white'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            Sold
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/10 gap-2">
                      <button
                        onClick={() => onViewDetails(prop)}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1 transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onEditProperty(prop)}
                          className="px-3 py-1.5 rounded-lg bg-[#C6A46A]/20 hover:bg-[#C6A46A]/30 border border-[#C6A46A]/40 text-[#E3C594] text-xs font-semibold flex items-center gap-1 transition"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => handleDeleteProperty(prop.id)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition"
                          title="Delete Property"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: AGENCY & CEO PROFILE */}
      {activeTab === 'agency' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0F1722] border border-[#C6A46A]/40 shadow-xl">
            <h3 className="font-cinzel text-xl font-bold text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#C6A46A]" />
              <span>Agency Leadership & Executive Profile</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
              <div className="p-4 rounded-xl bg-[#090E16] border border-white/10">
                <span className="text-[10px] uppercase font-bold text-[#C6A46A] block mb-1">
                  Chief Executive Officer
                </span>
                <p className="font-semibold text-white text-sm">Muhammad Mubashir Ali</p>
                <p className="text-slate-400 text-xs mt-0.5">The Ocean Real State</p>
              </div>

              <div className="p-4 rounded-xl bg-[#090E16] border border-white/10">
                <span className="text-[10px] uppercase font-bold text-[#C6A46A] block mb-1">
                  Direct WhatsApp Hotline
                </span>
                <p className="font-semibold text-emerald-400 text-sm">0342-8156086</p>
                <p className="text-slate-400 text-xs mt-0.5">Connected to customer consultation</p>
              </div>

              <div className="p-4 rounded-xl bg-[#090E16] border border-white/10">
                <span className="text-[10px] uppercase font-bold text-[#C6A46A] block mb-1">
                  Direct Phone Call
                </span>
                <p className="font-semibold text-white text-sm">0323-2930657</p>
                <p className="text-slate-400 text-xs mt-0.5">Primary voice line</p>
              </div>

              <div className="p-4 rounded-xl bg-[#090E16] border border-white/10">
                <span className="text-[10px] uppercase font-bold text-[#C6A46A] block mb-1">
                  Executive Email
                </span>
                <p className="font-semibold text-white text-sm">alimuhammad98573@gmail.com</p>
                <p className="text-slate-400 text-xs mt-0.5">Google Cloud & Firebase linked</p>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="font-semibold">All Agency Endpoints Active & Operational</p>
                <p className="text-slate-300 text-[11px] mt-0.5">
                  Firestore cloud database, live viewing bookings, and WhatsApp direct links are configured and ready for production client delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
