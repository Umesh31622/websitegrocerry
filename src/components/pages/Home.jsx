
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Home.css";

// const API_URL = "https://grocerrybackend.vercel.app/api/prices";

// export default function Home() {
//   const [prices, setPrices] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPrices = async () => {
//       try {
//         const res = await axios.get(API_URL);
//         if (res.data.success) {
//           setPrices(res.data.data);
//         }
//       } catch (err) {
//         console.error("Error fetching prices:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPrices();
//   }, []);

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="loading-text">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="home-container">
//       <div className="header-section">
//         <h1 className="page-title">Product List</h1>
//         {/* <p className="page-subtitle">Current pricing and availability</p> */}
//       </div>

//       <div className="price-grid">
//         {prices.map((item, i) => (
//           <div className="price-card" key={i}>
//             <div className="card-content">
//               <div className="price-img">
//                 <img
//                   src={item.image || "https://via.placeholder.com/200x200"}
//                   alt={item.name}
//                 />
//               </div>

//               <div className="price-info">
//                 <h2 className="item-name">{item.name}</h2>
//                 <p className="item-desc">
//                   {item.description || "No description available"}
//                 </p>

//                 <div className="price-details">
//                   <div className="price-row">
//                     {/* <span className="label">Base Price</span> */}
//                     {/* <span className="value">₹{item.basePrice}</span> */}
//                   </div>

//                   <div className="price-row">
//                     <span className="label">Change in Prices</span>
//                     <span className={`value ${item.difference >= 0 ? "positive" : "negative"}`}>
//                       {item.difference >= 0 ? `+₹${item.difference}` : `₹${item.difference}`}
//                     </span>
//                   </div>

//                   <div className="price-row final-price-row">
//                     <span className="label-final">Today Price Rate</span>
//                     <span className="value-final">
//                       ₹{item.basePrice + (item.difference || 0)}
//                     </span>
//                   </div>

//                   {item.validTill && (
//                     <div className="valid-till">
//                       <svg className="calendar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                       </svg>
//                       Valid until {new Date(item.validTill).toLocaleDateString('en-IN', { 
//                         year: 'numeric', 
//                         month: 'short', 
//                         day: 'numeric' 
//                       })}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {prices.length === 0 && !loading && (
//         <div className="empty-state">
//           <p>No prices available at the moment.</p>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

const API_URL = "https://grocerrybackend.vercel.app/api/prices";

export default function Home() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await axios.get(API_URL);
        if (res.data.success) {
          setPrices(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching prices:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrices();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  return (
    <div className="home-wrapper">
      {/* 🔍 Search bar */}
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input type="text" placeholder="Search products..." />
      </div>

      {/* 🟢 Product Grid */}
      <div className="product-grid">
        {prices.map((item, i) => (
          <div className="product-item" key={i}>
            <div className="product-img">
              <img
                src={item.image || "https://via.placeholder.com/200"}
                alt={item.name}
              />
            </div>
            <div className="product-info">
              <h4>{item.name}</h4>Change in Price :
               <p
                className={`difference ${
                  item.difference >= 0 ? "positive" : "negative"
                }`}
              >
                {item.difference >= 0
                  ? `+₹${item.difference}`
                  : `₹${item.difference}`}
              </p>
              <p className="price"><p>Today Price :</p>
                ₹{item.basePrice + (item.difference || 0)}
              </p>
             
              {item.validTill && (
                <p className="validity">
                  Valid till{" "}
                  {new Date(item.validTill).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 📢 Promo Section */}
      <div className="promo-banner">
        <h3>
          Connect with <span>19.1 Crore+</span> Customers
        </h3>
        <p>List your business for FREE on Grocerry </p>
        <button>List Your Business</button>
      </div>
    </div>
  );
}
