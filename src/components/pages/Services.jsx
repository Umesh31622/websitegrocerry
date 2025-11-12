import React from "react";
import "./Services.css";

const Services = () => {
  const services = [
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1500",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1500",
    "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1500",
    "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1500",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1500",
    "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1500",
    "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1500",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1500",
    "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1500",
    "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1500",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1500",
    "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1500",
    "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1500",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1500",
    "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1500",
    "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1500",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1500",
    "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1500",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1500",
    "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1500",
  ];

  return (
    <div className="services-container">
      <section className="services-header">
        <h1>Our Services</h1>
        <p>Discover the range of ways we make your grocery shopping better.</p>
      </section>

      <div className="services-grid">
        {services.map((img, index) => (
          <div className="service-card" key={index}>
            <img src={img} alt={`service-${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
