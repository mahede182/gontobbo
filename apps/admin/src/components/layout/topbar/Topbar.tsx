"use client";
import { Bell, Moon, Sun, Search, LogOut, ChevronDown, Languages } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

/** Skeleton placeholder for profile while loading */
const ProfileSkeleton = () => (
  <div className="topbar-profile-skeleton">
    <div className="skeleton-avatar" />
    <div className="skeleton-lines">
      <div className="skeleton-line skeleton-line--name" />
      <div className="skeleton-line skeleton-line--role" />
    </div>
  </div>
);

export const Topbar = () => {
  const { profile, isLoading, isError } = useProfile();
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const { t, i18n } = useTranslation();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayName = profile?.name ?? t("common.admin");
  const displayRole = profile?.role ?? t("common.administrator");
  const avatarUrl = profile?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=499dd2&color=fff&size=64`;

  const toggleLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLangDropdownOpen(false);
  };

  return (
    <header className="topbar" id="topbar">
      {/* Search */}
      <div className="topbar-search">
        <Search size={16} className="topbar-search-icon" />
        <input
          type="text"
          id="topbar-search-input"
          placeholder={t("common.search")}
          className="topbar-search-input"
        />
      </div>

      {/* Actions */}
      <div className="topbar-actions">
        {/* Language switcher */}
        <div className="topbar-profile-wrapper" ref={langDropdownRef} style={{ position: "relative" }}>
          <button
            className="topbar-profile-btn"
            id="topbar-lang-btn"
            aria-label={t("common.language")}
            onClick={() => setLangDropdownOpen((prev) => !prev)}
            style={{ padding: "6px 12px", gap: "6px", display: "flex", alignItems: "center" }}
          >
            <Languages size={16} />
            <span style={{ fontSize: "13px", fontWeight: 500 }}>
              {i18n.language === "bn" ? "বাংলা" : "English"}
            </span>
            <ChevronDown size={14} />
          </button>
          {langDropdownOpen && (
            <div className="topbar-dropdown" id="topbar-lang-dropdown" style={{ minWidth: "120px", right: 0, left: "auto" }}>
              <button
                className={`topbar-dropdown-item ${i18n.language === "en" ? "topbar-dropdown-item--active" : ""}`}
                onClick={() => toggleLanguage("en")}
                style={{ width: "100%", textAlign: "left" }}
              >
                English
              </button>
              <button
                className={`topbar-dropdown-item ${i18n.language === "bn" ? "topbar-dropdown-item--active" : ""}`}
                onClick={() => toggleLanguage("bn")}
                style={{ width: "100%", textAlign: "left" }}
              >
                বাংলা
              </button>
            </div>
          )}
        </div>

        {/* Notifications */}
        <button className="topbar-icon-btn" id="topbar-notifications-btn" aria-label="Notifications">
          <Bell size={20} />
          <span className="topbar-notification-dot" />
        </button>

        {/* Theme toggle */}
        <button
          className="topbar-icon-btn"
          id="topbar-theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {/* Profile */}
        <div className="topbar-profile-wrapper" ref={dropdownRef}>
          <button
            className="topbar-profile-btn"
            id="topbar-profile-btn"
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
          >
            {isLoading ? (
              <ProfileSkeleton />
            ) : (
              <>
                <img
                  src={avatarUrl}
                  className="topbar-profile-avatar"
                  alt={displayName}
                  width={36}
                  height={36}
                />
                <div className="topbar-profile-info">
                  <span className="topbar-profile-name">{displayName}</span>
                  <span className="topbar-profile-role">{displayRole}</span>
                </div>
                <ChevronDown
                  size={14}
                  className={`topbar-chevron ${dropdownOpen ? "topbar-chevron--open" : ""}`}
                />
              </>
            )}
          </button>

          {dropdownOpen && (
            <div className="topbar-dropdown" id="topbar-profile-dropdown">
              <div className="topbar-dropdown-header">
                <img
                  src={avatarUrl}
                  className="topbar-dropdown-avatar"
                  alt={displayName}
                  width={40}
                  height={40}
                />
                <div>
                  <div className="topbar-dropdown-name">{displayName}</div>
                  <div className="topbar-dropdown-email">
                    {profile?.email ?? "admin@gontobbo.com"}
                  </div>
                </div>
              </div>
              <div className="topbar-dropdown-divider" />
              <button
                className="topbar-dropdown-item topbar-dropdown-item--danger"
                id="topbar-logout-btn"
                onClick={logout}
              >
                <LogOut size={16} />
                {t("common.signOut")}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
