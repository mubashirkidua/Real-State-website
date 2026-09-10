import React, { useState, useEffect } from 'react';
import { Property, ViewingBooking } from '../types';
import { useAuth } from '../context/AuthContext';
import { subscribeToUserBookings, removeProperty } from '../lib/firebase';
import { PropertyCard } from './PropertyCard';
import {
  User,
  Building,
  Calendar,
  PlusCircle,
  LogOut,
  MapPin,
  Clock,
  CheckCircle2,
  Trash2,
  AlertCircle
} from 'lucide-react';

interface UserAccountSectionProps {
  allProperties: Property[];
  onAddNewProperty: () => void;
  onEditProperty: (property: Property) => void;
  onViewDetails: (property: Property) => void;
  onBookViewing: (property: Property) => void;
}

export const UserAccountSection: React.FC<UserAccountSectionProps> = ({
  allProperties,
  onAddNewProperty,
  onEditProperty,
  onViewDetails,
  onBookViewing
}) => {
  const { user, logout, openAuthModal } = useAuth();
  const [activeTab, setActiveTab] = useState<'properties' | 'viewings'>('properties');
  const [bookings, setBookings] = useState<ViewingBooking[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Filter properties owned by this user
  const userProperties = allProperties.filter(
    (p) => user && (p.sellerId === user.uid || p.sellerEmail === user.email)
  );

  // Subscribe to user's booked viewings
  useEffect(() => {
    if (!user) return;
    const unsub = subscribeToUserBookings(user.uid, (data) => {
      setBookings(data);
    });
    return () => unsub();
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center animate-fade-in text-slate-100">
        <div className="w-16 h-16 rounded-2xl bg-[#C6A46A]/10 border border-[#C6A46A]/30 text-[#E3C594] flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8" />
        </div>
        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mb-2">
          Account Access Required
        </h2>
        <p className="text-sm text-slate-400 mb-6 max-w-md mx-auto">
          Please sign in to view and manage your listed real estate properties, schedule private viewings, and track appointments.
        </p>
        <button
          onClick={() => openAuthModal('signin')}
          className="px-6 py-3 rounded-xl bg-[#C6A46A] hover:bg-[#D4B27C] text-[#0A1118] font-bold text-xs uppercase tracking-wider transition"
        >
          Sign In / Create Account
        </button>
      </div>
    );
  }

  const handleDelete = async (propId: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this property listing?')) {
      return;
    }
    setDeletingId(propId);
    try {
      await removeProperty(propId);
    } catch (err) {
      console.error('Failed to delete property:', err);
      alert('Could not delete property. Please check your network connection.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in text-slate-100">
      {/* Profile Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#0F1722] border border-[#C6A46A]/30 mb-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'User'}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-[#C6A46A]/50 shadow-md"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-[#C6A46A]/20 border border-[#C6A46A]/40 text-[#E3C594] font-cinzel font-bold text-2xl flex items-center justify-center">
                {(user.displayName || user.email || 'U')[0].toUpperCase()}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                  {user.displayName || 'The Ocean Real State Member'}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#C6A46A]/20 text-[#E3C594] border border-[#C6A46A]/30">
                  Verified Member
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{user.email}</p>
              <p className="text-[11px] text-slate-500 mt-1">
                Account ID: {user.uid.slice(0, 12)}...
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onAddNewProperty}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#B89354] to-[#C6A46A] hover:from-[#C6A46A] hover:to-[#D8B77E] text-[#0A1118] font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List New Property</span>
            </button>

            <button
              onClick={logout}
              className="px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-rose-500/10 hover:border-rose-500/30 text-slate-300 hover:text-rose-300 text-xs font-semibold uppercase tracking-wider transition flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-white/10 mb-8">
        <button
          onClick={() => setActiveTab('properties')}
          className={`flex items-center gap-2 pb-3.5 text-sm font-semibold tracking-wider transition relative ${
            activeTab === 'properties' ? 'text-[#E3C594]' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>My Listed Properties ({userProperties.length})</span>
          {activeTab === 'properties' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C6A46A]" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('viewings')}
          className={`flex items-center gap-2 pb-3.5 text-sm font-semibold tracking-wider transition relative ${
            activeTab === 'viewings' ? 'text-[#E3C594]' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>My Scheduled Viewings ({bookings.length})</span>
          {activeTab === 'viewings' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C6A46A]" />
          )}
        </button>
      </div>

      {/* Tab 1: My Listed Properties */}
      {activeTab === 'properties' && (
        <div>
          {userProperties.length === 0 ? (
            <div className="text-center py-16 p-8 rounded-2xl bg-[#0F1722]/50 border border-white/5">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 mx-auto mb-4">
                <Building className="w-7 h-7" />
              </div>
              <h3 className="font-cinzel text-lg font-bold text-white mb-2">
                No Properties Listed Yet
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">
                You haven't added any properties to The Ocean Real State catalog yet. Click below to publish your first house, apartment, or plot.
              </p>
              <button
                onClick={onAddNewProperty}
                className="px-6 py-3 rounded-xl bg-[#C6A46A] hover:bg-[#D4B27C] text-[#0A1118] font-bold text-xs uppercase tracking-wider transition"
              >
                Add Your First Property
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onViewDetails={onViewDetails}
                  onBookViewing={onBookViewing}
                  onEdit={onEditProperty}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: My Scheduled Viewings */}
      {activeTab === 'viewings' && (
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-16 p-8 rounded-2xl bg-[#0F1722]/50 border border-white/5">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 mx-auto mb-4">
                <Calendar className="w-7 h-7" />
              </div>
              <h3 className="font-cinzel text-lg font-bold text-white mb-2">
                No Viewings Scheduled
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Explore our catalog of houses, apartments, and building plots, and book a private walkthrough.
              </p>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="p-5 rounded-xl bg-[#0F1722] border border-white/10 hover:border-[#C6A46A]/30 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={booking.propertyImageUrl}
                    alt={booking.propertyTitle}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-cinzel text-base font-bold text-white truncate">
                        {booking.propertyTitle}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {booking.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1 truncate">
                      <MapPin className="w-3.5 h-3.5 text-[#C6A46A] shrink-0" />
                      <span className="truncate">{booking.propertyLocation}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-2">
                      <span className="flex items-center gap-1 font-medium text-white">
                        <Calendar className="w-3.5 h-3.5 text-[#C6A46A]" />
                        {booking.date}
                      </span>
                      <span className="flex items-center gap-1 text-[#E3C594]">
                        <Clock className="w-3.5 h-3.5" />
                        {booking.timeSlot}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-white/10">
                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] uppercase text-slate-400 block">Contact Info</span>
                    <span className="text-xs text-slate-200">{booking.userPhone}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
