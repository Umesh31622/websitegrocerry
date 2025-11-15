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

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const priceRes = await axios.get(PRICE_API);
//       const catRes = await axios.get(CATEGORY_API);

//       if (priceRes.data.success) {
//         setPrices(priceRes.data.data);
//         setFiltered(priceRes.data.data);
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

//   // ⭐ Filter logic: Category + Search
//   useEffect(() => {
//     let data = [...prices];

//     if (activeCategory !== "all") {
//       data = data.filter(
//         (item) => item.category?._id === activeCategory
//       );
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
//       {/* ================= LEFT CATEGORY SIDEBAR ================= */}
//       <div className="category-sidebar">
//         <h3>Categories</h3>

//         <ul>
//           <li
//             className={activeCategory === "all" ? "active" : ""}
//             onClick={() => setActiveCategory("all")}
//           >
//              All
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

//       {/* ================= RIGHT MAIN CONTENT ================= */}
//       <div className="home-wrapper">
//         {/* 🔍 Search bar */}
//         <div className="search-bar">
//           <span className="search-icon">🔍</span>
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         {/* 🟢 Product Grid */}
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
//                     Change:{" "}
//                     {item.difference >= 0
//                       ? `+₹${item.difference}`
//                       : `₹${item.difference}`}
//                   </p>

//                   <p className="price">
//                     Today Price: ₹
//                     {item.basePrice + (item.difference || 0)}
//                   </p>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* 📢 Promo Section */}
//         <div className="promo-banner">
//           <h3>
//             Connect with <span>19.1 Crore+</span> Customers
//           </h3>
//           <p>List your business for FREE on Grocery</p>
//           <button>List Your Business</button>
//         </div>
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
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  /* ==========================================
        TIME CHECK (8 AM – 11 PM)
  ========================================== */
  const isWithinTime = () => {
    const hour = new Date().getHours();
    return hour >= 8 && hour <= 23;
  };

  const showRealPrice = isWithinTime();

  /* ==========================================
        LOAD DATA
  ========================================== */
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const priceRes = await axios.get(PRICE_API);
      const catRes = await axios.get(CATEGORY_API);

      if (priceRes.data.success) {
        const today = new Date().toDateString();

        // ⭐ WEBSITE FILTER: remove past date items
        const validPrices = priceRes.data.data.filter((p) => {
          if (!p.validTill) return true;

          const vt = new Date(p.validTill).toDateString();
          return vt >= today; // only today or future
        });

        setPrices(validPrices);
        setFiltered(validPrices);
      }

      if (catRes.data.success) {
        setCategories(catRes.data.categories);
      }
    } catch (err) {
      console.error("Load error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ==========================================
      CATEGORY + SEARCH FILTER
  ========================================== */
  useEffect(() => {
    let data = [...prices];

    if (activeCategory !== "all") {
      data = data.filter((item) => item.category?._id === activeCategory);
    }

    if (search.trim()) {
      data = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(data);
  }, [activeCategory, search, prices]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  return (
    <div className="home-layout">
      {/* ================= LEFT CATEGORY SIDEBAR ================= */}
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
              {cat.name}
            </li>
          ))}
        </ul>
      </div>

      {/* ================= RIGHT MAIN CONTENT ================= */}
      <div className="home-wrapper">
        {/* 🔍 Search bar */}
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* 🟢 Product Grid */}
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

                  {/* Difference */}
                  <p
                    className={`difference ${
                      item.difference >= 0 ? "positive" : "negative"
                    }`}
                  >
                    Change:{" "}
                    {item.difference >= 0
                      ? `+₹${item.difference}`
                      : `₹${item.difference}`}
                  </p>

                  {/* ⭐ FINAL PRICE LOGIC (Website Only) */}
                  <p className="price">
                    {showRealPrice ? (
                      <>
                        Today Price: ₹
                        {item.basePrice + (item.difference || 0)}
                      </>
                    ) : (
                      <span className="coming">Price will be coming soon</span>
                    )}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 📢 Promo Section */}
        <div className="promo-banner">
          <h3>
            Connect with <span>19.1 Crore+</span> Customers
          </h3>
          <p>List your business for FREE on Grocery</p>
          <button>List Your Business</button>
        </div>
      </div>
    </div>
  );
}

