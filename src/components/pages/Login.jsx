import React, { useState } from "react";
import axios from "axios";
import "./login.css"
export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // toggle between login & register
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (isLogin) {
        // Login API
        const res = await axios.post("https://grocerrybackend.vercel.app/api/user/login", {
          email: form.email,
          password: form.password,
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        setMessage("Login successful!");
      } else {
        // Register API
        const res = await axios.post("https://grocerrybackend.vercel.app/api/user/register", form);
        setMessage(res.data.message);
      }
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-toggle">
        <button
          className={isLogin ? "active" : ""}
          onClick={() => { setIsLogin(true); setMessage(""); }}
        >
          Login
        </button>
        <button
          className={!isLogin ? "active" : ""}
          onClick={() => { setIsLogin(false); setMessage(""); }}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        {message && <p className="message">{message}</p>}

        {!isLogin && (
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
        )}
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? (isLogin ? "Logging in..." : "Registering...") : isLogin ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
}