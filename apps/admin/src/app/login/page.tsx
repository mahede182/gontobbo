"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { API_BASE_URL } from "@/utils/api/fetcher";
import { LogoE } from "@/components/layout/sidebar/LogoE";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((r) => r.json());
    if (res.data?.accessToken) login(res.data.accessToken);
    else alert("Login failed");
  };

  const handleDevLogin = () => {
    setEmail("admin@gontobbo.co");
    setPassword("Admin@1234");
    // We can't synchronously submit because state updates are batched,
    // but the user can just click "Login" after autofill, or we can trigger it in a timeout
    setTimeout(() => {
      document
        .getElementById("login-form")
        ?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
    }, 100);
  };

  return (
    <div className="login-container">
      <div className="login-left" style={{ backgroundImage: "url('/login-bg.png')" }}>
        <div className="login-logo-circle">
          <LogoE />
        </div>
      </div>
      <div className="login-right">
        <div className="login-form-wrapper">
          <h1 className="login-title">Login</h1>
          <form id="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email</label>
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
              <label className="form-label">Password</label>
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
                Remember Me
              </label>
              <button type="submit" className="btn-login">
                Login
              </button>
            </div>

            {/* <div className="mt-24 pt-24" style={{ borderTop: '1px dashed #EEE', textAlign: 'center' }}> */}
            <button
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
              Dev Quick Login
            </button>
            {/* </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
