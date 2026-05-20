"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { API_BASE_URL } from "@/utils/api/fetcher";
import { LogoE } from "@/components/layout/sidebar/LogoE";
import { FullPageLoader } from "@/components/common/FullPageLoader";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }).then((r) => r.json());
      if (res.data?.accessToken) login(res.data.accessToken);
      else alert(t("login.loginFailed"));
    } catch (error) {
      alert(t("login.loginFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDevLogin = () => {
    if (process.env.NODE_ENV !== "production") {
      setEmail("admin@gontobbo.co");
      setPassword("Admin@1234");
    }
  };

  return (
    <>
      {isLoading && <FullPageLoader />}
      <div className="login-container">
        <div className="login-left" style={{ backgroundImage: "url('/login-bg.png')" }}>
          <div className="login-logo-circle">
            <LogoE />
          </div>
        </div>
        <div className="login-right">
          <div className="login-form-wrapper">
            <h1 className="login-title">{t("login.title")}</h1>
            <form id="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">{t("login.email")}</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="test@live.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">{t("login.password")}</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="login-footer">
                <label className="checkbox-group">
                  <input type="checkbox" />
                  {t("login.rememberMe")}
                </label>
                <button type="submit" className="btn-login" disabled={isLoading}>
                  {isLoading ? t("login.loggingIn") : t("login.title")}
                </button>
              </div>

              <button
                type="button"
                onClick={handleDevLogin}
                style={{
                  background: "#F2F8FD",
                  color: "var(--color-primary)",
                  border: "1px solid var(--color-primary)",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  cursor: "pointer",
                  fontWeight: 500,
                  marginTop: "12px",
                }}>
                {t("login.devQuickLogin")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
