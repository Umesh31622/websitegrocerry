import React from "react";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-col">
          <h2>Grocerry+</h2>
          <p>
            Your one-stop grocery destination. Shop fresh, save more, and enjoy
            fast delivery to your doorstep.
          </p>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            {/* <li><a href="/products">Products</a></li>
            <li><a href="/analytics">Analytics</a></li> */}
            <li><a href="/about">Analytics</a></li>
            {/* <li><a href="/contact">Contact Us</a></li> */}
          </ul>
        </div>

        <div className="footer-col">
          <h3>Contact</h3>
          <ul>
            <li><Phone className="icon" /> +91 98765 43210</li>
            <li><Mail className="icon" /> support@Grocerry.com</li>
            <li><MapPin className="icon" /> New Delhi, India</li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Follow Us</h3>
          <div className="social">
            <a href="#"><Facebook /></a>
            <a href="#"><Instagram /></a>
            <a href="#"><Twitter /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Grocerry+. All rights reserved.
      </div>
    </footer>
  );
}
