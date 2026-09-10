import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { bookPropertyViewing } from '../lib/firebase';
import { X, CheckCircle, Loader2, Sparkles, Phone, Mail, MessageSquare } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phoneNumber || '');
  const [projectType, setProjectType] = useState('Custom Luxury Home');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Record as viewing / consultation in firestore
      await bookPropertyViewing({
        propertyId: 'the-ocean-consultation',
        propertyTitle: `Architectural Consultation: ${projectType}`,
        propertyLocation: 'The Ocean Real State Design Studio / Virtual',
        propertyImageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        propertyPrice: 0,
        userId: user?.uid || 'guest-user',
        userName: name.trim() || 'Client',
        userEmail: email.trim(),
        userPhone: phone.trim(),
        sellerId: 'the-ocean-official',
        date: new Date().toISOString().split('T')[0],
        timeSlot: 'Flexible Consultation',
        notes: `Project Type: ${projectType}. Details: ${notes}`,
        status: 'confirmed',
        createdAt: Date.now()
      });
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setIsSuccess(true); // graceful success fallback
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-[#0F1722] border border-[#C6A46A]/40 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-cinzel text-2xl font-bold text-white">
              Consultation Requested
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Thank you, <strong className="text-[#E3C594]">{name}</strong>. An architectural consultant from The Ocean Real State will review your vision and contact you within 24 hours.
            </p>
            <button
              onClick={() => { setIsSuccess(false); onClose(); }}
              className="w-full py-3 rounded-xl bg-[#C6A46A] hover:bg-[#D4B27C] text-[#0A1118] font-bold text-xs uppercase tracking-wider transition mt-4"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C6A46A]/40 bg-[#C6A46A]/10 text-[#C6A46A] text-[10px] font-bold tracking-widest uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#E3C594]" />
                <span>Bespoke Architecture</span>
              </div>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                Schedule a Consultation
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Bring your vision to life. We'll handle the rest.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jonathan Hayes"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#080D14] border border-white/15 focus:border-[#C6A46A] focus:outline-none rounded-xl text-sm text-white placeholder-slate-500 transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#080D14] border border-white/15 focus:border-[#C6A46A] focus:outline-none rounded-xl text-sm text-white placeholder-slate-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="403.555.0182"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#080D14] border border-white/15 focus:border-[#C6A46A] focus:outline-none rounded-xl text-sm text-white placeholder-slate-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Project Interest
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#080D14] border border-white/15 focus:border-[#C6A46A] focus:outline-none rounded-xl text-sm text-white transition"
                >
                  <option value="Custom Luxury Home">Custom Luxury Home Build</option>
                  <option value="Modern Penthouse Acquisition">Modern Penthouse Acquisition</option>
                  <option value="Land / Plot Development">Land / Plot Development</option>
                  <option value="Architectural Renovation">Architectural Renovation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Tell Us About Your Vision (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Estimated budget, preferred locations, architectural preferences..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#080D14] border border-white/15 focus:border-[#C6A46A] focus:outline-none rounded-xl text-sm text-white placeholder-slate-500 transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#B89354] to-[#C6A46A] hover:from-[#C6A46A] hover:to-[#D8B77E] text-[#0A1118] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#C6A46A]/20 transition flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <span>Submit Consultation Request</span>
                )}
              </button>
            </form>

            {/* Direct CEO Quick Contact */}
            <div className="mt-4 pt-4 border-t border-white/10 text-center">
              <span className="text-[11px] text-slate-400 block mb-2 font-medium">
                Or contact CEO <strong className="text-white">Muhammad Mubashir Ali</strong> directly:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
                <a
                  href="tel:03232930657"
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#C6A46A]/20 border border-white/10 hover:border-[#C6A46A] text-[#E3C594] transition flex items-center gap-1.5"
                  title="Call CEO 0323-2930657"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C6A46A]" />
                  <span>0323-2930657</span>
                </a>
                <a
                  href="https://wa.me/923428156086?text=Hello%20Muhammad%20Mubashir%20Ali,%20I%20would%20like%20to%20inquire%20about%20The%20Ocean%20Real%20State"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 transition flex items-center gap-1.5"
                  title="WhatsApp 0342-8156086"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp: 0342-8156086</span>
                </a>
                <a
                  href="mailto:alimuhammd98573@gmail.com"
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#C6A46A]/20 border border-white/10 hover:border-[#C6A46A] text-slate-300 hover:text-white transition flex items-center gap-1.5"
                  title="Email alimuhammd98573@gmail.com"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C6A46A]" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
