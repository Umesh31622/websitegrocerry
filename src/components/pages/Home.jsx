
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import "./Home.css";

// // const API_URL = "https://grocerrybackend.vercel.app/api/prices";

// // export default function Home() {
// //   const [prices, setPrices] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchPrices = async () => {
// //       try {
// //         const res = await axios.get(API_URL);
// //         if (res.data.success) {
// //           setPrices(res.data.data);
// //         }
// //       } catch (err) {
// //         console.error("Error fetching prices:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchPrices();
// //   }, []);

// //   if (loading) {
// //     return (
// //       <div className="loading-container">
// //         <div className="loading-text">Loading...</div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="home-container">
// //       <div className="header-section">
// //         <h1 className="page-title">Product List</h1>
// //         {/* <p className="page-subtitle">Current pricing and availability</p> */}
// //       </div>

// //       <div className="price-grid">
// //         {prices.map((item, i) => (
// //           <div className="price-card" key={i}>
// //             <div className="card-content">
// //               <div className="price-img">
// //                 <img
// //                   src={item.image || "https://via.placeholder.com/200x200"}
// //                   alt={item.name}
// //                 />
// //               </div>

// //               <div className="price-info">
// //                 <h2 className="item-name">{item.name}</h2>
// //                 <p className="item-desc">
// //                   {item.description || "No description available"}
// //                 </p>

// //                 <div className="price-details">
// //                   <div className="price-row">
// //                     {/* <span className="label">Base Price</span> */}
// //                     {/* <span className="value">₹{item.basePrice}</span> */}
// //                   </div>

// //                   <div className="price-row">
// //                     <span className="label">Change in Prices</span>
// //                     <span className={`value ${item.difference >= 0 ? "positive" : "negative"}`}>
// //                       {item.difference >= 0 ? `+₹${item.difference}` : `₹${item.difference}`}
// //                     </span>
// //                   </div>

// //                   <div className="price-row final-price-row">
// //                     <span className="label-final">Today Price Rate</span>
// //                     <span className="value-final">
// //                       ₹{item.basePrice + (item.difference || 0)}
// //                     </span>
// //                   </div>

// //                   {item.validTill && (
// //                     <div className="valid-till">
// //                       <svg className="calendar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
// //                       </svg>
// //                       Valid until {new Date(item.validTill).toLocaleDateString('en-IN', { 
// //                         year: 'numeric', 
// //                         month: 'short', 
// //                         day: 'numeric' 
// //                       })}
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {prices.length === 0 && !loading && (
// //         <div className="empty-state">
// //           <p>No prices available at the moment.</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import "./Home.css";

// // const API_URL = "https://grocerrybackend.vercel.app/api/prices";

// // export default function Home() {
// //   const [prices, setPrices] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchPrices = async () => {
// //       try {
// //         const res = await axios.get(API_URL);
// //         if (res.data.success) {
// //           setPrices(res.data.data);
// //         }
// //       } catch (err) {
// //         console.error("Error fetching prices:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchPrices();
// //   }, []);

// //   if (loading) {
// //     return (
// //       <div className="loading-container">
// //         <div className="loading-text">Loading...</div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="home-wrapper">
// //       {/* 🔍 Search bar */}
// //       <div className="search-bar">
// //         <span className="search-icon">🔍</span>
// //         <input type="text" placeholder="Search products..." />
// //       </div>

// //       {/* 🟢 Product Grid */}
// //       <div className="product-grid">
// //         {prices.map((item, i) => (
// //           <div className="product-item" key={i}>
// //             <div className="product-img">
// //               <img
// //                 src={item.image || "https://via.placeholder.com/200"}
// //                 alt={item.name}
// //               />
// //             </div>
// //             <div className="product-info">
// //               <h4>{item.name}</h4>Change in Price :
// //                <p
// //                 className={`difference ${
// //                   item.difference >= 0 ? "positive" : "negative"
// //                 }`}
// //               >
// //                 {item.difference >= 0
// //                   ? `+₹${item.difference}`
// //                   : `₹${item.difference}`}
// //               </p>
// //               <p className="price"><p>Today Price :</p>
// //                 ₹{item.basePrice + (item.difference || 0)}
// //               </p>
             
// //               {/* {item.validTill && (
// //                 <p className="validity">
// //                   Valid till{" "}
// //                   {new Date(item.validTill).toLocaleDateString("en-IN", {
// //                     day: "numeric",
// //                     month: "short",
// //                     year: "numeric",
// //                   })}
// //                 </p>
// //               )} */}
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* 📢 Promo Section */}
// //       <div className="promo-banner">
// //         <h3>
// //           Connect with <span>19.1 Crore+</span> Customers
// //         </h3>
// //         <p>List your business for FREE on Grocerry </p>
// //         <button>List Your Business</button>
// //       </div>
// //     </div>
// //   );
// // }

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import "./Home.css";

// // const PRICE_API = "https://grocerrybackend.vercel.app/api/prices";
// // const CATEGORY_API = "https://grocerrybackend.vercel.app/api/categories";

// // export default function Home() {
// //   const [prices, setPrices] = useState([]);
// //   const [filtered, setFiltered] = useState([]);
// //   const [categories, setCategories] = useState([]);
// //   const [activeCategory, setActiveCategory] = useState("all");
// //   const [search, setSearch] = useState("");

// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     loadData();
// //   }, []);

// //   const loadData = async () => {
// //     try {
// //       const priceRes = await axios.get(PRICE_API);
// //       const catRes = await axios.get(CATEGORY_API);

// //       if (priceRes.data.success) {
// //         setPrices(priceRes.data.data);
// //         setFiltered(priceRes.data.data);
// //       }
// //       if (catRes.data.success) {
// //         setCategories(catRes.data.categories);
// //       }
// //     } catch (err) {
// //       console.error("Load error:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ⭐ Filter logic: Category + Search
// //   useEffect(() => {
// //     let data = [...prices];

// //     if (activeCategory !== "all") {
// //       data = data.filter(
// //         (item) => item.category?._id === activeCategory
// //       );
// //     }

// //     if (search.trim()) {
// //       data = data.filter((item) =>
// //         item.name.toLowerCase().includes(search.toLowerCase())
// //       );
// //     }

// //     setFiltered(data);
// //   }, [activeCategory, search, prices]);

// //   if (loading) {
// //     return (
// //       <div className="loading-container">
// //         <div className="loading-text">Loading...</div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="home-layout">
// //       {/* ================= LEFT CATEGORY SIDEBAR ================= */}
// //       <div className="category-sidebar">
// //         <h3>Categories</h3>

// //         <ul>
// //           <li
// //             className={activeCategory === "all" ? "active" : ""}
// //             onClick={() => setActiveCategory("all")}
// //           >
// //              All
// //           </li>

// //           {categories.map((cat) => (
// //             <li
// //               key={cat._id}
// //               className={activeCategory === cat._id ? "active" : ""}
// //               onClick={() => setActiveCategory(cat._id)}
// //             >
// //               {cat.image && <img src={cat.image} alt="cat" />}
// //               {cat.name}
// //             </li>
// //           ))}
// //         </ul>
// //       </div>

// //       {/* ================= RIGHT MAIN CONTENT ================= */}
// //       <div className="home-wrapper">
// //         {/* 🔍 Search bar */}
// //         <div className="search-bar">
// //           <span className="search-icon">🔍</span>
// //           <input
// //             type="text"
// //             placeholder="Search products..."
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //           />
// //         </div>

// //         {/* 🟢 Product Grid */}
// //         <div className="product-grid">
// //           {filtered.length === 0 ? (
// //             <p className="no-items">No items found</p>
// //           ) : (
// //             filtered.map((item, i) => (
// //               <div className="product-item" key={i}>
// //                 <div className="product-img">
// //                   <img
// //                     src={item.image || "https://via.placeholder.com/200"}
// //                     alt={item.name}
// //                   />
// //                 </div>

// //                 <div className="product-info">
// //                   <h4>{item.name}</h4>

// //                   <p
// //                     className={`difference ${
// //                       item.difference >= 0 ? "positive" : "negative"
// //                     }`}
// //                   >
// //                     Change:{" "}
// //                     {item.difference >= 0
// //                       ? `+₹${item.difference}`
// //                       : `₹${item.difference}`}
// //                   </p>

// //                   <p className="price">
// //                     Today Price: ₹
// //                     {item.basePrice + (item.difference || 0)}
// //                   </p>
// //                 </div>
// //               </div>
// //             ))
// //           )}
// //         </div>

// //         {/* 📢 Promo Section */}
// //         <div className="promo-banner">
// //           <h3>
// //             Connect with <span>19.1 Crore+</span> Customers
// //           </h3>
// //           <p>List your business for FREE on Grocery</p>
// //           <button>List Your Business</button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import "./Home.css";

// // const PRICE_API = "https://grocerrybackend.vercel.app/api/prices";
// // const CATEGORY_API = "https://grocerrybackend.vercel.app/api/categories";

// // export default function Home() {
// //   const [prices, setPrices] = useState([]);
// //   const [filtered, setFiltered] = useState([]);
// //   const [categories, setCategories] = useState([]);
// //   const [activeCategory, setActiveCategory] = useState("all");
// //   const [search, setSearch] = useState("");

// //   const [loading, setLoading] = useState(true);

// //   /* ==========================================
// //         TIME CHECK (8 AM – 11 PM)
// //   ========================================== */
// //   const isWithinTime = () => {
// //     const hour = new Date().getHours();
// //     return hour >= 8 && hour <= 23;
// //   };

// //   const showRealPrice = isWithinTime();

// //   /* ==========================================
// //         LOAD DATA
// //   ========================================== */
// //   useEffect(() => {
// //     loadData();
// //   }, []);

// //   const loadData = async () => {
// //     try {
// //       const priceRes = await axios.get(PRICE_API);
// //       const catRes = await axios.get(CATEGORY_API);

// //       if (priceRes.data.success) {
// //         const today = new Date().toDateString();

// //         // ⭐ WEBSITE FILTER: remove past date items
// //         const validPrices = priceRes.data.data.filter((p) => {
// //           if (!p.validTill) return true;

// //           const vt = new Date(p.validTill).toDateString();
// //           return vt >= today; // only today or future
// //         });

// //         setPrices(validPrices);
// //         setFiltered(validPrices);
// //       }

// //       if (catRes.data.success) {
// //         setCategories(catRes.data.categories);
// //       }
// //     } catch (err) {
// //       console.error("Load error:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   /* ==========================================
// //       CATEGORY + SEARCH FILTER
// //   ========================================== */
// //   useEffect(() => {
// //     let data = [...prices];

// //     if (activeCategory !== "all") {
// //       data = data.filter((item) => item.category?._id === activeCategory);
// //     }

// //     if (search.trim()) {
// //       data = data.filter((item) =>
// //         item.name.toLowerCase().includes(search.toLowerCase())
// //       );
// //     }

// //     setFiltered(data);
// //   }, [activeCategory, search, prices]);

// //   if (loading) {
// //     return (
// //       <div className="loading-container">
// //         <div className="loading-text">Loading...</div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="home-layout">
// //       {/* ================= LEFT CATEGORY SIDEBAR ================= */}
// //       <div className="category-sidebar">
// //         <h3>Categories</h3>

// //         <ul>
// //           <li
// //             className={activeCategory === "all" ? "active" : ""}
// //             onClick={() => setActiveCategory("all")}
// //           >
// //             All
// //           </li>

// //           {categories.map((cat) => (
// //             <li
// //               key={cat._id}
// //               className={activeCategory === cat._id ? "active" : ""}
// //               onClick={() => setActiveCategory(cat._id)}
// //             >
// //               {cat.image && <img src={cat.image} alt="cat" />}
// //               {cat.name}
// //             </li>
// //           ))}
// //         </ul>
// //       </div>

// //       {/* ================= RIGHT MAIN CONTENT ================= */}
// //       <div className="home-wrapper">
// //         {/* 🔍 Search bar */}
// //         <div className="search-bar">
// //           <span className="search-icon">🔍</span>
// //           <input
// //             type="text"
// //             placeholder="Search products..."
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //           />
// //         </div>

// //         {/* 🟢 Product Grid */}
// //         <div className="product-grid">
// //           {filtered.length === 0 ? (
// //             <p className="no-items">No items found</p>
// //           ) : (
// //             filtered.map((item, i) => (
// //               <div className="product-item" key={i}>
// //                 <div className="product-img">
// //                   <img
// //                     src={item.image || "https://via.placeholder.com/200"}
// //                     alt={item.name}
// //                   />
// //                 </div>

// //                 <div className="product-info">
// //                   <h4>{item.name}</h4>

// //                   {/* Difference */}
// //                   <p
// //                     className={`difference ${
// //                       item.difference >= 0 ? "positive" : "negative"
// //                     }`}
// //                   >
// //                     Change:{" "}
// //                     {item.difference >= 0
// //                       ? `+₹${item.difference}`
// //                       : `₹${item.difference}`}
// //                   </p>

// //                   {/* ⭐ FINAL PRICE LOGIC (Website Only) */}
// //                   <p className="price">
// //                     {showRealPrice ? (
// //                       <>
// //                         Today Price: ₹
// //                         {item.basePrice + (item.difference || 0)}
// //                       </>
// //                     ) : (
// //                       <span className="coming">Price will be coming soon</span>
// //                     )}
// //                   </p>
// //                 </div>
// //               </div>
// //             ))
// //           )}
// //         </div>

// //         {/* 📢 Promo Section */}
// //         <div className="promo-banner">
// //           <h3>
// //             Connect with <span>19.1 Crore+</span> Customers
// //           </h3>
// //           <p>List your business for FREE on Grocery</p>
// //           <button>List Your Business</button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Home.css";

// const PRICE_API = "https://grocerrybackend.vercel.app/api/prices";
// const CATEGORY_API = "https://grocerrybackend.vercel.app/api/categories";

// export default function Home() {
//   const [prices, setPrices] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [search, setSearch] = useState("");

//   const [loading, setLoading] = useState(true);

//   /* TIME CHECK 8 AM – 11 PM */
//   const isWithinTime = () => {
//     const hour = new Date().getHours();
//     return hour >= 8 && hour <= 23;
//   };

//   const showRealPrice = isWithinTime();

//   /* LOAD DATA */
//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const priceRes = await axios.get(PRICE_API);
//       const catRes = await axios.get(CATEGORY_API);

//       if (priceRes.data.success) {
//         const today = new Date().toDateString();

//         const validPrices = priceRes.data.data.filter((p) => {
//           if (!p.validTill) return true;
//           return new Date(p.validTill).toDateString() >= today;
//         });

//         setPrices(validPrices);
//         setFiltered(validPrices);
//       }

//       if (catRes.data.success) {
//         setCategories(catRes.data.categories);
//       }
//     } catch (err) {
//       console.error("Load error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* CATEGORY + SEARCH FILTER */
//   useEffect(() => {
//     let data = [...prices];

//     if (activeCategory !== "all") {
//       data = data.filter((item) => item.category?._id === activeCategory);
//     }

//     if (search.trim()) {
//       data = data.filter((item) =>
//         item.name.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     setFiltered(data);
//   }, [activeCategory, search, prices]);

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="loading-text">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="home-layout">

//       {/* LEFT CATEGORY SIDEBAR */}
//       <div className="category-sidebar">
//         <h3>Categories</h3>

//         <ul>
//           <li
//             className={activeCategory === "all" ? "active" : ""}
//             onClick={() => setActiveCategory("all")}
//           >
//             All
//           </li>

//           {categories.map((cat) => (
//             <li
//               key={cat._id}
//               className={activeCategory === cat._id ? "active" : ""}
//               onClick={() => setActiveCategory(cat._id)}
//             >
//               {cat.image && <img src={cat.image} alt="cat" />}
//               {cat.name}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* RIGHT MAIN CONTENT */}
//       <div className="home-wrapper">

//         {/* Search bar */}
//         <div className="search-bar">
//           <span className="search-icon">🔍</span>
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         {/* PRODUCT GRID */}
//         <div className="product-grid">
//           {filtered.length === 0 ? (
//             <p className="no-items">No items found</p>
//           ) : (
//             filtered.map((item, i) => (
//               <div className="product-item" key={i}>
//                 <div className="product-img">
//                   <img
//                     src={item.image || "https://via.placeholder.com/200"}
//                     alt={item.name}
//                   />
//                 </div>

//                 <div className="product-info">
//                   <h4>{item.name}</h4>

//                   <p
//                     className={`difference ${
//                       item.difference >= 0 ? "positive" : "negative"
//                     }`}
//                   >
//                     TEJI/MADDI:{" "}
//                     {item.difference >= 0
//                       ? `+₹${item.difference}`
//                       : `₹${item.difference}`}
//                   </p>

//                   {/* ⭐ ONLY PRODUCT LEVEL TIMING + PRICE */}
//                   <div className="product-price-box">
//                     {showRealPrice ? (
//                       <>
//                         <p className="price">
//                           Today Rate: ₹
//                           {item.basePrice + (item.difference || 0)}
//                         </p>
//                         <p className="store-status open">
//                            Live Price (8AM–11PM)
//                         </p>
//                       </>
//                     ) : (
//                       <>
//                         <p className="price">Price will be coming soon</p>
//                         <p className="store-status closed">
//                            Store Closed (8AM–11PM)
//                         </p>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Promo Section */}
//         {/* <div className="promo-banner">
//           <h3>
//             Connect with <span>19.1 Crore+</span> Customers
//           </h3>
//           <p>List your business for FREE on Grocery</p>
//           <button>List Your Business</button>
//         </div> */}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

const PRICE_API = "https://grocerrybackend.vercel.app/api/prices";
const CATEGORY_API = "https://grocerrybackend.vercel.app/api/categories";

export default function Home() {
  const [prices, setPrices] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSub, setActiveSub] = useState("all_sub");

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* TIME CHECK */
  const isWithinTime = () => {
    const hour = new Date().getHours();
    return hour >= 8 && hour <= 23;
  };
  const showRealPrice = isWithinTime();

  /* LOAD DATA */
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const priceRes = await axios.get(PRICE_API);
      const catRes = await axios.get(CATEGORY_API);

      if (priceRes.data.success) {
        const today = new Date().toDateString();
        const validPrices = priceRes.data.data.filter((p) => {
          if (!p.validTill) return true;
          return new Date(p.validTill).toDateString() >= today;
        });

        setPrices(validPrices);
        setFiltered(validPrices);
      }

      if (catRes.data.success) {
        setCategories(catRes.data.categories || []);
      }
    } catch (err) {
      console.error("Load error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* LOAD SUBCATEGORY WHEN CATEGORY SELECTED */
  useEffect(() => {
    if (activeCategory === "all") {
      setSubcategories([]);
      setActiveSub("all_sub");
      return;
    }

    const cat = categories.find((c) => c._id === activeCategory);
    setSubcategories(cat?.subcategories || []);
    setActiveSub("all_sub");
  }, [activeCategory, categories]);

  /* FILTER PRICE LIST */
  useEffect(() => {
    let data = [...prices];

    // category filter
    if (activeCategory !== "all") {
      data = data.filter((item) => item.category?._id === activeCategory);
    }

    // subcategory filter
    if (activeSub !== "all_sub") {
      data = data.filter((item) => item.subcategory?._id === activeSub);
    }

    // search
    if (search.trim()) {
      data = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(data);
  }, [activeCategory, activeSub, search, prices]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  return (
    <div className="home-layout">
      {/* LEFT CATEGORY SIDEBAR (unchanged CSS) */}
      <div className="category-sidebar">
        <h3>Categories</h3>

        <ul>
          <li
            className={activeCategory === "all" ? "active" : ""}
            onClick={() => setActiveCategory("all")}
          >
            All
          </li>

          {categories.map((cat) => (
            <li
              key={cat._id}
              className={activeCategory === cat._id ? "active" : ""}
              onClick={() => setActiveCategory(cat._id)}
            >
              {cat.image && <img src={cat.image} alt="cat" />}
              <span>{cat.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT CONTENT */}
      <div className="home-wrapper">

        {/* ================= FILTER BAR ================= */}
        <div style={{ marginBottom: "20px", display: "flex", gap: "12px", flexWrap: "wrap" }}>

          {/* Category Dropdown */}
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            style={{
              padding: "12px 16px",
              borderRadius: "12px",
              border: "1px solid #d0d7e3",
              background: "white"
            }}
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Subcategory Dropdown */}
          <select
            value={activeSub}
            onChange={(e) => setActiveSub(e.target.value)}
            style={{
              padding: "12px 16px",
              borderRadius: "12px",
              border: "1px solid #d0d7e3",
              background: subcategories.length ? "white" : "#f1f5f9"
            }}
            disabled={!subcategories.length}
          >
            <option value="all_sub">All Subcategories</option>
            {subcategories.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>

          {/* Search */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "12px 16px",
              borderRadius: "12px",
              border: "1px solid #d0d7e3",
              flex: "1"
            }}
          />
        </div>

        {/* SEARCH BAR (Your existing UI remains same) */}
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* PRODUCT GRID */}
        <div className="product-grid">
          {filtered.length === 0 ? (
            <p className="no-items">No items found</p>
          ) : (
            filtered.map((item, i) => (
              <div className="product-item" key={i}>
                <div className="product-img">
                  <img
                    src={item.image || "https://via.placeholder.com/200"}
                    alt={item.name}
                  />
                </div>

                <div className="product-info">
                  <h4>{item.name}</h4>
<p className="price">
                          Today Rate: ₹
                          {item.basePrice + (item.difference || 0)}
                        </p>  
                

                  {/* TIME BASED PRICE */}
                  <div className="product-price-box">
                    {showRealPrice ? (
                      <>  
                        
                       <p
                    className={`difference ${
                      item.difference >= 0 ? "positive" : "negative"
                    }`}
                  >
                    TEJI/MADDI:{" "}
                    {item.difference >= 0
                      ? `+₹${item.difference}`
                      : `₹${item.difference}`}
                  </p>  
                        <p className="store-status open">
                          Live Price (8AM–11PM)
                        </p> 
                        
                      </>
                    ) : (
                      <>
                        <p className="price">Price will be coming soon</p>
                        <p className="store-status closed">
                          Store Closed (8AM–11PM)
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}




