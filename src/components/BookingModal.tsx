import React, { useState, useEffect } from 'react';
import { Property, ViewingBooking } from '../types';
import { useAuth } from '../context/AuthContext';
import { bookPropertyViewing } from '../lib/firebase';
import { getPropertyImages } from '../utils/propertyImages';
import { X, Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle, Loader2 } from 'lucide-react';

interface BookingModalProps {
  property: Property | null;
  onClose: () => void;
  onSuccess?: () => void;
}

const TIME_SLOTS = [
  '10:00 AM - 11:00 AM',
  '11:30 AM - 12:30 PM',
  '01:30 PM - 02:30 PM',
  '03:00 PM - 04:00 PM',
  '04:30 PM - 05:30 PM',
];

export const BookingModal: React.FC<BookingModalProps> = ({ property, onClose, onSuccess }) => {
  const { user, openAuthModal } = useAuth();

  // Get tomorrow's date formatted as YYYY-MM-DD
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const [date, setDate] = useState(minDate);
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);
  const [name, setName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phoneNumber || '');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imgIndex, setImgIndex] = useState(0);

  const images = property ? getPropertyImages(property) : [];

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  if (!property) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!user) {
      // Prompt user to authenticate first for persistent booking link
      openAuthModal('signin');
      return;
    }

    if (!date) {
      setError('Please select a preferred viewing date');
      return;
    }

    if (!phone.trim()) {
      setError('Please provide a contact phone number for confirmation');
      return;
    }

    setIsSubmitting(true);
    try {
      const bookingData: Omit<ViewingBooking, 'id'> = {
        propertyId: property.id,
        propertyTitle: property.title,
        propertyLocation: property.location,
        propertyImageUrl: property.imageUrl,
        propertyPrice: property.price,
        userId: user.uid,
        userName: name.trim() || user.displayName || 'Prospective Buyer',
        userEmail: email.trim() || user.email || '',
        userPhone: phone.trim(),
        sellerId: property.sellerId,
        date,
        timeSlot,
        notes: notes.trim(),
        status: 'confirmed',
        createdAt: Date.now()
      };

      await bookPropertyViewing(bookingData);
      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error('Booking error:', err);
      setError(err.message || 'Failed to submit viewing reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-[#0F1722] border border-[#C6A46A]/40 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100 my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-4 animate-scale-up">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-cinzel text-2xl font-bold text-white">
              Viewing Confirmed!
            </h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
              Your private architectural viewing for <strong className="text-[#E3C594]">{property.title}</strong> has been scheduled for:
            </p>
            <div className="p-4 rounded-xl bg-[#090E16] border border-white/10 text-sm text-slate-200 inline-block text-left w-full max-w-sm space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-xs">Date:</span>
                <span className="font-semibold text-white">{date}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-xs">Time:</span>
                <span className="font-semibold text-[#E3C594]">{timeSlot}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-xs">Location:</span>
                <span className="text-slate-200 text-xs truncate max-w-[200px]">{property.location}</span>
              </div>
            </div>
            <p className="text-xs text-slate-400">
              Our representative will reach out at {phone} to coordinate entry.
            </p>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full py-3 px-6 rounded-xl bg-[#C6A46A] hover:bg-[#D8B77E] text-[#0A1118] font-bold text-xs uppercase tracking-wider transition"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C6A46A] font-bold block mb-1">
                Private Appointment
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                Schedule a Property Viewing
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                {property.title} • {property.location}
              </p>
            </div>

            {/* Property Summary Strip */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#090E16] border border-white/10 mb-6">
              <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-black/40">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${property.title} - ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                      idx === imgIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  />
                ))}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-semibold text-white truncate">
                  {property.title}
                </h4>
                <p className="text-[11px] text-slate-400 truncate">
                  {property.category} • ${property.price.toLocaleString()}
                </p>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs mb-4">
                {error}
              </div>
            )}

            {!user && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs mb-4 flex items-center justify-between">
                <span>Please sign in to save viewing bookings to your account.</span>
                <button
                  type="button"
                  onClick={() => openAuthModal('signin')}
                  className="px-2.5 py-1 rounded bg-[#C6A46A] text-[#0A1118] text-[11px] font-bold shrink-0 ml-2"
                >
                  Sign In
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Date Picker */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C6A46A]" />
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    min={minDate}
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#080D14] border border-white/15 focus:border-[#C6A46A] focus:outline-none rounded-xl text-sm text-white transition"
                  />
                </div>

                {/* Time Slot Picker */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C6A46A]" />
                    Time Window
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#080D14] border border-white/15 focus:border-[#C6A46A] focus:outline-none rounded-xl text-sm text-white transition"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot} className="bg-[#0F1722] text-white">
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#C6A46A]" />
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#080D14] border border-white/15 focus:border-[#C6A46A] focus:outline-none rounded-xl text-sm text-white placeholder-slate-500 transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Email */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#C6A46A]" />
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#080D14] border border-white/15 focus:border-[#C6A46A] focus:outline-none rounded-xl text-sm text-white placeholder-slate-500 transition"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#C6A46A]" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 403.555.0192"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#080D14] border border-white/15 focus:border-[#C6A46A] focus:outline-none rounded-xl text-sm text-white placeholder-slate-500 transition"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#C6A46A]" />
                  Special Requests / Questions (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g., Interested in private garage access and zoning documentation."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#080D14] border border-white/15 focus:border-[#C6A46A] focus:outline-none rounded-xl text-sm text-white placeholder-slate-500 transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-3 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#B89354] to-[#C6A46A] hover:from-[#C6A46A] hover:to-[#D8B77E] text-[#0A1118] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#C6A46A]/20 transition flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Confirming Appointment...</span>
                  </>
                ) : (
                  <span>Confirm Viewing Request</span>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
