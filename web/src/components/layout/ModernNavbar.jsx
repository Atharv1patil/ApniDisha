// src/components/ModernNavbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import NotificationCenter from "../notifications/NotificationCenter";
import logo from "./image.jpeg";
import {
  Menu,
  X,
  Bell,
  User,
  ChevronDown,
  ChevronRight,
  BookOpen,
  GraduationCap,
  Users,
  Calendar,
  FileText,
  Target,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";

const NAV_ITEMS = [
  { key: "quiz", href: "/quiz", title: "Quizzes", icon: BookOpen },
  { key: "recommendations", href: "/recommendations", title: "Recommendations", icon: GraduationCap },
  { key: "colleges", href: "/colleges", title: "Colleges", icon: Users },
  { key: "timeline", href: "/timeline", title: "Timeline", icon: Calendar },
  { key: "content", href: "/content", title: "Study Content", icon: FileText },
  { key: "dishalab", href: "/simulator", title: "Disha Lab", icon: Target },
];

const ModernNavbar = () => {
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [openExplore, setOpenExplore] = useState(false);
  const [unreadCount] = useState(0);

  const exploreRef = useRef(null);
  const hoverTimer = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (exploreRef.current && !exploreRef.current.contains(e.target)) setOpenExplore(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const isActive = (path) => location.pathname === path;

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिंदी" },
    { code: "ur", label: "اردو" },
    { code: "dogri", label: "डोगरी" },
    { code: "gojri", label: "گوجری" },
    { code: "pahari", label: "पहाड़ी" },
    { code: "mi", label: "मराठी" },
  ];
  
  const openExploreDelayed = () => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpenExplore(true), 80);
  };
  const closeExploreDelayed = () => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpenExplore(false), 120);
  };

  return (
    <nav className="bg-white/85 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="ApniDisha" className="h-9 w-auto rounded-md shadow-sm" />
              <div className="hidden sm:block">
                <div className="text-lg font-bold text-gray-900">ApniDisha</div>
                <div className="text-xs text-gray-500 -mt-1">Career & Education Advisor</div>
              </div>
            </Link>
          </div>

          {/* Right: controls including Explore (moved here) */}
          <div className="flex items-center gap-2">
            {/* Put Explore in the right controls - ensure parent is relative to anchor the dropdown */}
            <div
              ref={exploreRef}
              className="relative"
              onMouseEnter={openExploreDelayed}
              onMouseLeave={closeExploreDelayed}
            >
              <button
                aria-expanded={openExplore}
                aria-haspopup="menu"
                onClick={() => setOpenExplore((s) => !s)}
                onKeyDown={(e) => { if (e.key === "Escape") setOpenExplore(false); }}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-md focus:outline-none transition text-gray-700 hover:bg-gray-50`}
              >
                <span className="hidden sm:block text-sm font-medium">Explore</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${openExplore ? "rotate-180" : "rotate-0"}`} />
              </button>

              {/* Dropdown anchored to the right (so it opens near the icons and not over the hero headline) */}
              <AnimatePresence>
                {openExplore && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.14 }}
                    className="absolute right-0 mt-2 w-[520px] rounded-xl bg-white/90 backdrop-blur-md shadow-lg border border-white/20 z-50"
                    role="menu"
                  >
                    <div className="grid grid-cols-3 gap-2 p-3">
                      {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.key}
                            to={item.href}
                            onClick={() => setOpenExplore(false)}
                            className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg hover:bg-indigo-50 transition text-center"
                            role="menuitem"
                          >
                            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-indigo-50 text-indigo-600">
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="text-sm font-medium text-gray-900">{item.title}</div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Notifications */}
            <div>
              <Button variant="ghost" size="sm" onClick={() => setIsNotifOpen((s) => !s)}>
                <Bell className="h-5 w-5 text-gray-600" />
              </Button>
              {unreadCount > 0 && (
                <Badge className="absolute -mt-8 ml-4 bg-red-500 text-white">{unreadCount}</Badge>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <Button variant="ghost" size="sm" onClick={() => setIsProfileOpen((s) => !s)}>
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
              </Button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-100">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile</Link>
                  <Link to="/bookmarks" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Bookmarks</Link>
                  <Link to="/login" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">Sign Out</Link>
                </div>
              )}
            </div>

            {/* Language (desktop) */}
            <div className="hidden md:block">
              <select
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="border rounded px-2 py-1 text-sm bg-white/90"
                aria-label="Language"
              >
                {languages.map((lng) => (
                  <option key={lng.code} value={lng.code}>{lng.label}</option>
                ))}
              </select>
            </div>

            {/* Mobile menu toggle */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen((s) => !s)}>
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.12 }}
              className="md:hidden bg-white/95 border-t"
            >
              <div className="px-4 py-4 space-y-3">
                <MobileExploreBlock />

                <div>
                  <select
                    value={language}
                    onChange={(e) => { changeLanguage(e.target.value); setIsMobileMenuOpen(false); }}
                    className="w-full border rounded px-2 py-2 text-sm bg-white"
                  >
                    {languages.map((lng) => (
                      <option key={lng.code} value={lng.code}>{lng.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <NotificationCenter isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
      </div>
    </nav>
  );
};

/* MobileExploreBlock (mobile-friendly version of the dropdown) */
const MobileExploreBlock = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-100 rounded-lg overflow-hidden">
      <button
        className="w-full px-4 py-3 flex items-center justify-between text-left"
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
      >
        <div>
          <div className="font-medium">Explore</div>
          <div className="text-sm text-gray-500">Quizzes, colleges, timelines and more</div>
        </div>
        <ChevronRight className={`h-5 w-5 transition-transform ${open ? "rotate-90" : "rotate-0"}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.14 }}
            className="px-2 pb-3 bg-white"
          >
            <div className="grid grid-cols-2 gap-2">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.key}
                    to={item.href}
                    className="flex items-center gap-3 p-3 rounded-md hover:bg-indigo-50"
                  >
                    <div className="p-2 bg-indigo-50 rounded-md text-indigo-600">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="font-medium text-gray-900">{item.title}</div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModernNavbar;
