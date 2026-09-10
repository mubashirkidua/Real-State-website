import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Home, PlusCircle, User, LogOut, Menu, X, Building, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'sell' | 'account' | 'admin';
  setActiveTab: (tab: 'home' | 'sell' | 'account' | 'admin') => void;
  onOpenSellModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { user, openAuthModal, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSellClick = () => {
    if (!user) {
      openAuthModal('signin');
      return;
    }
    setActiveTab('sell');
    setMobileMenuOpen(false);
  };

  const handleAccountClick = () => {
    if (!user) {
      openAuthModal('signin');
      return;
    }
    setActiveTab('account');
    setMobileMenuOpen(false);
  };

  const handleAdminClick = () => {
    setActiveTab('admin');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0A1118]/95 backdrop-blur-md border-b border-[#C6A46A]/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand */}
          <button
            id="brand-logo-btn"
            onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
            className="flex items-center gap-3.5 text-left group"
          >
            <div className="w-11 h-11 rounded-lg border border-[#C6A46A]/50 bg-[#121B24] flex items-center justify-center text-[#C6A46A] shadow-inner group-hover:border-[#C6A46A] transition">
              {/* Monogram Crest */}
              <div className="relative flex items-center justify-center">
                <span className="font-cinzel text-base font-bold tracking-widest text-[#E3C594]">ORS</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-cinzel text-lg sm:text-xl font-bold tracking-wider text-white">
                  THE OCEAN
                </span>
                <span className="font-cinzel text-lg sm:text-xl font-bold tracking-wider text-[#C6A46A]">
                  REAL STATE
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#C6A46A] font-medium">
                  Coastal & Prime Estates
                </span>
                <span className="hidden sm:inline text-[9px] text-slate-500">•</span>
                <span className="hidden sm:inline text-[9px] tracking-wider uppercase text-slate-400">
                  Luxury Properties
                </span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#0F1722]/80 border border-white/10 rounded-full px-3 py-1.5 shadow-sm">
            <button
              id="nav-properties-btn"
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition ${
                activeTab === 'home'
                  ? 'bg-[#C6A46A] text-[#0A1118] shadow-md shadow-[#C6A46A]/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              Properties
            </button>

            <button
              id="nav-sell-btn"
              onClick={handleSellClick}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition ${
                activeTab === 'sell'
                  ? 'bg-[#C6A46A] text-[#0A1118] shadow-md shadow-[#C6A46A]/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Sell Property
            </button>

            <button
              id="nav-account-btn"
              onClick={handleAccountClick}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition ${
                activeTab === 'account'
                  ? 'bg-[#C6A46A] text-[#0A1118] shadow-md shadow-[#C6A46A]/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              My Properties
            </button>

            <button
              id="nav-admin-btn"
              onClick={handleAdminClick}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition ${
                activeTab === 'admin'
                  ? 'bg-gradient-to-r from-[#B89354] to-[#C6A46A] text-[#0A1118] shadow-md shadow-[#C6A46A]/20 font-bold'
                  : 'text-[#E3C594] hover:text-white hover:bg-[#C6A46A]/10 border border-[#C6A46A]/30'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C6A46A]" />
              <span>Admin Portal</span>
            </button>
          </nav>

          {/* User Auth Buttons / Profile */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <button
                  id="user-profile-shortcut-btn"
                  onClick={handleAccountClick}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#141F2C] border border-[#C6A46A]/30 hover:border-[#C6A46A] transition text-left"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      referrerPolicy="no-referrer"
                      className="w-7 h-7 rounded-full object-cover border border-[#C6A46A]/40"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#C6A46A]/20 text-[#C6A46A] flex items-center justify-center text-xs font-semibold">
                      {(user.displayName || user.email || 'U')[0].toUpperCase()}
                    </div>
                  )}
                  <span className="text-xs font-medium text-slate-200 max-w-[120px] truncate">
                    {user.displayName || user.email?.split('@')[0]}
                  </span>
                </button>

                <button
                  id="navbar-signout-btn"
                  onClick={logout}
                  title="Sign Out"
                  className="p-2 rounded-full text-slate-400 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition"
                  aria-label="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <button
                  id="navbar-signin-btn"
                  onClick={() => openAuthModal('signin')}
                  className="px-4 py-2 text-xs uppercase tracking-wider font-semibold text-slate-200 hover:text-[#C6A46A] transition"
                >
                  Sign In
                </button>
                <button
                  id="navbar-signup-btn"
                  onClick={() => openAuthModal('signup')}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#B89354] to-[#C6A46A] hover:from-[#C6A46A] hover:to-[#D8B77E] text-[#0A1118] text-xs uppercase tracking-wider font-bold shadow-md shadow-[#C6A46A]/20 transition"
                >
                  Join / Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 space-y-2 animate-fade-in">
            <button
              onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                activeTab === 'home' ? 'bg-[#C6A46A] text-[#0A1118]' : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              <Home className="w-4 h-4" />
              Properties Catalog
            </button>

            <button
              onClick={handleSellClick}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                activeTab === 'sell' ? 'bg-[#C6A46A] text-[#0A1118]' : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              Sell / List Property
            </button>

            <button
              onClick={handleAccountClick}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                activeTab === 'account' ? 'bg-[#C6A46A] text-[#0A1118]' : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              <Building className="w-4 h-4" />
              My Account & Listed Properties
            </button>

            <button
              id="mobile-nav-admin-btn"
              onClick={handleAdminClick}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                activeTab === 'admin'
                  ? 'bg-[#C6A46A] text-[#0A1118]'
                  : 'text-[#E3C594] hover:bg-[#C6A46A]/10 border border-[#C6A46A]/30'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#C6A46A]" />
              <span>Admin Portal (Agency Center)</span>
            </button>

            <div className="pt-3 border-t border-white/10">
              {user ? (
                <div className="flex items-center justify-between px-4 py-2">
                  <div className="flex items-center gap-2.5">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User avatar"
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#C6A46A]/20 text-[#C6A46A] flex items-center justify-center font-bold text-xs">
                        {(user.displayName || user.email || 'U')[0].toUpperCase()}
                      </div>
                    )}
                    <span className="text-sm font-medium text-white truncate max-w-[160px]">
                      {user.displayName || user.email}
                    </span>
                  </div>
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 py-1 px-2 rounded-lg bg-rose-500/10"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 px-2 pt-1">
                  <button
                    onClick={() => { openAuthModal('signin'); setMobileMenuOpen(false); }}
                    className="w-full py-2.5 rounded-lg border border-white/20 text-slate-200 text-xs font-semibold text-center"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { openAuthModal('signup'); setMobileMenuOpen(false); }}
                    className="w-full py-2.5 rounded-lg bg-[#C6A46A] text-[#0A1118] text-xs font-bold text-center"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
